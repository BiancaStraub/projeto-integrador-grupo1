import { createFileRoute } from '@tanstack/react-router';
import { Plus, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useBakery } from '@/components/bakery-store';
import { useRequireSignIn } from '@/components/use-signed-in';
import { money, pageHead, products } from '@/lib/bakery';
import { demoPrice } from '@/lib/demo-catalog';
import { promoPrice, promotions } from '@/lib/promotions';
export const Route=createFileRoute('/promocoes')({head:()=>pageHead('Promoções','Ofertas especiais em pães, doces e combos da Maison.'),component:Promotions});
function Promotions(){
  const store=useBakery();const {require}=useRequireSignIn();
  const items=promotions.flatMap(pr=>{const p=products.find(x=>x.id===pr.productId);if(!p)return [];const base=store.demoAccount?demoPrice(p.id,store.branchId,store.demoCatalog,p.price):p.price;return [{...p,price:base,promo:pr}];});
  return <main className="page-width py-10 reveal"><p className="eyebrow text-primary mb-2">Só por tempo limitado</p><h1 className="text-5xl">Promoções</h1><p className="text-sm text-muted-foreground mt-3">Descontos especiais em itens do nosso cardápio.</p>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-sm:gap-3 mt-8">{items.map(p=><article key={p.id} className="product-card"><div className="relative overflow-hidden"><img className="product-image" src={p.image} alt={p.name} width={512} height={512} loading="lazy"/><span className="absolute top-3 left-3 text-[10px] bg-primary text-primary-foreground rounded-full px-3 py-1.5 flex gap-1 items-center"><Tag size={11}/>−{p.promo.percent}%</span></div><div className="p-4"><p className="text-[9px] text-muted-foreground mb-1.5">{p.promo.label}</p><h2 className="font-sans text-sm font-semibold">{p.name}</h2><div className="flex items-center justify-between mt-3"><span className="text-sm"><s className="text-muted-foreground text-[11px] mr-1.5">{money(p.price)}</s><span className="text-primary font-semibold">{money(promoPrice(p.id,p.price))}</span></span><Button variant="add" size="icon" className="size-8" aria-label={`Adicionar ${p.name}`} onClick={()=>{if(!require())return;store.add({...p,productId:p.id,requiresPreparation:p.category==='Combos'});toast.success(`${p.name} adicionado ao carrinho.`);}}><Plus size={17}/></Button></div></div></article>)}</div></main>;
}
