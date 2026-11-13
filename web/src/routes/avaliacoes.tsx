import { createFileRoute, Link } from '@tanstack/react-router';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBakery } from '@/components/bakery-store';
import { pageHead } from '@/lib/bakery';
import { sampleReviews } from '@/lib/reviews';
import { demoAccounts } from '@/lib/demo-accounts';
export const Route=createFileRoute('/avaliacoes')({head:()=>pageHead('Avaliações','O que nossos clientes dizem sobre os pães, doces e bolos da Maison.'),component:Reviews});
function Stars({n}:{n:number}){return <span className="flex gap-0.5 text-primary" aria-label={`${n} de 5 estrelas`}>{[1,2,3,4,5].map(i=><Star key={i} size={15} fill={i<=n?'currentColor':'none'}/>)}</span>;}
function Reviews(){
  const store=useBakery();
  const fromOrders=store.orders.filter(o=>o.review).map(o=>({name:demoAccounts.find(a=>a.id===o.customerDemoId)?.name.split('·').pop()?.trim()??'Cliente Maison',rating:o.review!.rating,text:o.review!.text,date:o.date}));
  const all=[...fromOrders,...sampleReviews];const avg=all.reduce((s,r)=>s+r.rating,0)/all.length;
  return <main className="page-width py-10 reveal"><p className="eyebrow text-primary mb-2">Quem prova, conta</p><h1 className="text-5xl">Avaliações</h1>
    <div className="flex items-center gap-4 mt-6 border-y py-5"><span className="text-4xl font-semibold text-primary">{avg.toFixed(1).replace('.',',')}</span><div><Stars n={Math.round(avg)}/><p className="text-xs text-muted-foreground mt-1">{all.length} avaliações de compras</p></div><Button asChild variant="outline" className="ml-auto"><Link to="/pedidos">Avaliar meu pedido</Link></Button></div>
    <div className="grid md:grid-cols-2 gap-5 mt-8">{all.map((r,i)=><article key={i} className="border rounded-lg p-5 bg-card"><div className="flex justify-between items-center"><h2 className="font-sans text-sm font-semibold">{r.name}</h2><Stars n={r.rating}/></div>{r.text&&<p className="text-sm mt-3 leading-6">“{r.text}”</p>}<p className="text-[10px] text-muted-foreground mt-3">{r.date.split('-').reverse().join('/')} · Compra verificada</p></article>)}</div>
    <p className="text-xs text-muted-foreground mt-6">Somente clientes logados podem avaliar, a partir dos próprios pedidos.</p></main>;
}
