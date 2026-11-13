import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Package, CalendarDays, Plus, Pencil, Save } from 'lucide-react';
import { toast } from 'sonner';
import { PlatformLayout } from '@/components/platform-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { accountQuery } from '@/lib/platform-queries';
import { catalogSettingsQuery } from '@/lib/store-catalog-queries';
import { saveCampaign, saveProductSetting } from '@/lib/store-catalog.functions';
import { stockStatuses, campaignSchema, localDate, type Campaign, type StockStatus } from '@/lib/store-catalog';
import { branches, pageHead, products } from '@/lib/bakery';
export const Route = createFileRoute('/_authenticated/loja')({ head: () => pageHead('Gestão da loja', 'Estoque por filial e campanhas sazonais da Maison.'), loader: async ({ context }) => { await Promise.all([context.queryClient.ensureQueryData(accountQuery()), context.queryClient.ensureQueryData(catalogSettingsQuery())]); }, component: StoreManagement });
function StoreManagement() {
  const { data: account } = useSuspenseQuery(accountQuery());
  const { data: catalog } = useSuspenseQuery(catalogSettingsQuery());
  const client = useQueryClient();
  const saveStock = useServerFn(saveProductSetting);
  const saveSeason = useServerFn(saveCampaign);
  const [tab, setTab] = useState<'stock'|'campaigns'>('stock');
  const [branch, setBranch] = useState('jardins');
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState(false);
  const [editing, setEditing] = useState<Partial<Campaign>|null>(null);
  const [error, setError] = useState('');
  async function update(id: string, status: StockStatus, campaign: string|null) {
    setPending(true);
    try { await saveStock({ data: { product_id: id, branch_id: branch as 'jardins'|'pinheiros'|'moema', stock_status: status, campaign_id: campaign } }); await client.invalidateQueries({queryKey:['store-catalog']}); toast.success('Produto atualizado.'); } catch (e) { toast.error(e instanceof Error ? e.message : 'Não foi possível salvar.'); } finally { setPending(false); }
  }
  if (!account.roles.includes('admin')) return <PlatformLayout title="Gestão da loja"><p className="text-sm py-8">Somente administradores podem alterar o estoque e os cardápios sazonais.</p></PlatformLayout>;
  return <PlatformLayout title="Gestão da loja">
    <div className="flex gap-2 mb-7"><Button variant={tab==='stock'?'bakery':'outline'} onClick={()=>setTab('stock')} aria-pressed={tab==='stock'}><Package/>Estoque</Button><Button variant={tab==='campaigns'?'bakery':'outline'} onClick={()=>setTab('campaigns')} aria-pressed={tab==='campaigns'}><CalendarDays/>Cardápios sazonais</Button></div>
    {tab==='stock'?<><div className="grid sm:grid-cols-2 gap-4 mb-6"><label className="text-xs">Filial<select className="form-field mt-2" value={branch} onChange={e=>setBranch(e.target.value)}>{branches.map(b=><option value={b.id} key={b.id}>{b.name}</option>)}</select></label><label className="text-xs">Buscar produto<input className="form-field mt-2" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Nome do produto"/></label></div><div className="divide-y">{products.filter(p=>p.name.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'))).map(p=>{
      const setting=catalog.settings.find(s=>s.product_id===p.id&&s.branch_id===branch);
      return <article key={p.id} className="grid grid-cols-[48px_1fr] md:grid-cols-[48px_1fr_180px_220px] gap-4 items-center py-4"><img src={p.image} alt={p.name} width={48} height={48} className="size-12 object-cover rounded-md"/><div><h2 className="font-sans text-sm font-semibold">{p.name}</h2><p className="text-xs text-muted-foreground">{p.category}</p></div><label className="text-xs">Status<select aria-label={`Estoque de ${p.name}`} disabled={pending} className="form-field mt-1" value={setting?.stock_status??'DISPONIVEL'} onChange={e=>void update(p.id,e.target.value as StockStatus,setting?.campaign_id??null)}>{Object.entries(stockStatuses).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label><label className="text-xs">Campanha<select aria-label={`Campanha de ${p.name}`} disabled={pending} className="form-field mt-1" value={setting?.campaign_id??''} onChange={e=>void update(p.id,setting?.stock_status??'DISPONIVEL',e.target.value||null)}><option value="">Sempre no cardápio</option>{catalog.campaigns.map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select></label></article>;
    })}</div></>:<section><div className="flex justify-between items-center gap-4 mb-6"><h2 className="text-3xl">Campanhas</h2><Button variant="bakery" onClick={()=>{setError('');setEditing({name:'',start_date:localDate(),end_date:localDate(),active:false});}}><Plus/>Nova campanha</Button></div>{catalog.campaigns.length===0?<p className="text-sm text-muted-foreground py-12 border-y">Nenhuma campanha cadastrada.</p>:<div className="divide-y">{catalog.campaigns.map(c=><article className="flex justify-between items-center gap-4 py-5" key={c.id}><div><h3 className="text-2xl">{c.name}</h3><p className="text-xs text-muted-foreground mt-1">{c.start_date.split('-').reverse().join('/')} – {c.end_date.split('-').reverse().join('/')} · {c.active?'Ativa':'Inativa'}</p></div><Button variant="ghost" size="icon" aria-label={`Editar ${c.name}`} title="Editar campanha" onClick={()=>{setError('');setEditing(c);}}><Pencil/></Button></article>)}</div>}</section>}
    <Dialog open={editing!==null} onOpenChange={open=>{if(!open)setEditing(null);}}><DialogContent><DialogTitle>{editing?.id?'Editar campanha':'Nova campanha'}</DialogTitle><DialogDescription>Período de exibição do cardápio sazonal.</DialogDescription>{editing&&<form className="space-y-4" onSubmit={async e=>{e.preventDefault();const parsed=campaignSchema.safeParse(editing);if(!parsed.success){setError('Informe o nome e um período válido.');return;}setPending(true);try{await saveSeason({data:parsed.data});await client.invalidateQueries({queryKey:['store-catalog']});setEditing(null);toast.success('Campanha salva.');}catch(e){setError(e instanceof Error?e.message:'Não foi possível salvar.');}finally{setPending(false);}}}><label className="text-xs block">Nome<input required className="form-field mt-2" value={editing.name??''} maxLength={100} onChange={e=>setEditing({...editing,name:e.target.value})}/></label><div className="grid grid-cols-2 gap-3"><label className="text-xs">Início<input required type="date" className="form-field mt-2" value={editing.start_date??''} onChange={e=>setEditing({...editing,start_date:e.target.value})}/></label><label className="text-xs">Fim<input required type="date" min={editing.start_date} className="form-field mt-2" value={editing.end_date??''} onChange={e=>setEditing({...editing,end_date:e.target.value})}/></label></div><label className="flex gap-3 items-center text-sm"><Switch checked={editing.active??false} onCheckedChange={active=>setEditing({...editing,active})}/>Campanha ativa</label>{error&&<p className="text-xs text-primary" role="alert">{error}</p>}<Button variant="bakery" disabled={pending} type="submit"><Save/>{pending?'Salvando…':'Salvar campanha'}</Button></form>}</DialogContent></Dialog>
  </PlatformLayout>;
}