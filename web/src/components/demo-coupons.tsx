import { useState } from 'react';
import { Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBakery } from './bakery-store';
import { demoAccounts } from '@/lib/demo-accounts';

const customers = demoAccounts.filter(a => a.role === 'customer' || a.role === 'company');

export function DemoCoupons() {
  const store = useBakery(); const account = store.demoAccount;
  const [code, setCode] = useState(''); const [percent, setPercent] = useState('10');
  const [target, setTarget] = useState<Record<string, string>>({});
  if (!account) return null;
  const role = account.role;
  const mine = store.coupons.filter(c => c.holders.includes(account.id));
  return <section className="border rounded-lg p-6 mt-8" aria-label="Cupons">
    <h2 className="text-3xl flex items-center gap-2"><Ticket className="text-primary" />{role === 'admin' ? 'Gerenciar cupons' : role === 'employee' ? 'Distribuir cupons' : 'Meus cupons'}</h2>
    {(role === 'customer' || role === 'company') && (mine.length ? <div className="grid sm:grid-cols-2 gap-3 mt-5">{mine.map(c => <div key={c.code} className={`border border-dashed rounded-lg p-4 ${c.active ? 'border-primary' : 'opacity-60'}`}><p className="text-xl font-semibold text-primary tracking-wider">{c.code}</p><p className="text-sm mt-1">{c.percent}% de desconto no pedido</p><p className="text-[10px] text-muted-foreground mt-2">{c.active ? 'Use no carrinho ao finalizar' : 'Cupom pausado pela loja'}</p></div>)}</div> : <p className="text-sm text-muted-foreground mt-4">Você ainda não tem cupons. Peça para a equipe da loja.</p>)}
    {role === 'admin' && <form className="flex flex-wrap gap-2 mt-5 items-end" onSubmit={e => { e.preventDefault(); store.saveCoupon(code, Number(percent)); setCode(''); }}><label className="text-xs">Código<input value={code} onChange={e => setCode(e.target.value)} maxLength={20} className="form-field mt-1 uppercase" placeholder="EX: DOCE10" /></label><label className="text-xs">Desconto (%)<input type="number" min={1} max={50} value={percent} onChange={e => setPercent(e.target.value)} className="form-field mt-1 w-28" /></label><Button type="submit" variant="bakery" disabled={!code.trim()}>Criar cupom</Button></form>}
    {(role === 'admin' || role === 'employee') && <div className="divide-y mt-5 border-t">{store.coupons.map(c => <div key={c.code} className="flex flex-wrap items-center gap-3 py-3"><span className="font-semibold tracking-wider w-32">{c.code}</span><span className="text-sm w-16">{c.percent}%</span><span className={`text-xs ${c.active ? 'text-olive' : 'text-muted-foreground'}`}>{c.active ? 'Ativo' : 'Inativo'}</span><span className="text-xs text-muted-foreground flex-1">{c.holders.length ? `Com: ${c.holders.map(h => demoAccounts.find(a => a.id === h)?.name.split('·').pop()?.trim()).join(', ')}` : 'Ainda não distribuído'}</span>
      {role === 'admin' && <Button size="sm" variant="outline" onClick={() => store.toggleCoupon(c.code)}>{c.active ? 'Desativar' : 'Ativar'}</Button>}
      {c.active && <span className="flex gap-2"><select aria-label={`Cliente para ${c.code}`} className="form-field h-9 text-xs w-44" value={target[c.code] ?? ''} onChange={e => setTarget(t => ({ ...t, [c.code]: e.target.value }))}><option value="">Escolher cliente</option>{customers.filter(a => !c.holders.includes(a.id)).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select><Button size="sm" variant="bakery" disabled={!target[c.code]} onClick={() => { store.giveCoupon(c.code, target[c.code]!); setTarget(t => ({ ...t, [c.code]: '' })); }}>Enviar</Button></span>}
    </div>)}</div>}
    {role === 'employee' && <p className="text-[10px] text-muted-foreground mt-3">Somente cupons ativados pelo administrador podem ser enviados.</p>}
  </section>;
}
