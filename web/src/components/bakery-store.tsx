import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { branches, type CartItem } from '@/lib/bakery';

export type Order = { id:string; items:CartItem[]; total:number; method:string; date:string; time:string; address:string; branchId:string; messages:{text:string;customer:boolean}[] };
type State = { branchId:string; selected:boolean; cart:CartItem[]; orders:Order[] };
const initial:State = {branchId:'jardins',selected:false,cart:[],orders:[]};
type Store = State & { ready:boolean; setBranch:(id:string)=>void; add:(item:Omit<CartItem,'quantity'>)=>void; quantity:(id:string,quantity:number)=>void; checkout:(order:Omit<Order,'id'|'items'|'messages'|'branchId'>)=>void; message:(id:string,text:string)=>void };
const Context = createContext<Store|null>(null);
export function BakeryProvider({children}:{children:ReactNode}) {
  const [state,setState] = useState<State>(initial);
  const [ready,setReady] = useState(false);
  useEffect(()=>{try { const raw=localStorage.getItem('maison-demo-v1'); if(raw) { const data=JSON.parse(raw); if(Array.isArray(data.cart)&&Array.isArray(data.orders)&&branches.some(b=>b.id===data.branchId)) setState(data); } } catch { /* Use clean demo state if storage is unavailable. */ } setReady(true);},[]);
  useEffect(()=>{if(ready) { try {localStorage.setItem('maison-demo-v1',JSON.stringify(state));} catch { /* The current session remains usable without persistence. */ } }},[state,ready]);
  const store:Store = {...state,ready,
    setBranch:(id)=>setState(s=>({...s,branchId:id,selected:true})),
    add:(item)=>setState(s=>({...s,cart:s.cart.some(i=>i.id===item.id)?s.cart.map(i=>i.id===item.id?{...i,quantity:i.quantity+1}:i):[...s.cart,{...item,quantity:1}]})),
    quantity:(id,value)=>setState(s=>({...s,cart:value<=0?s.cart.filter(i=>i.id!==id):s.cart.map(i=>i.id===id?{...i,quantity:value}:i)})),
    checkout:(order)=>setState(s=>s.cart.length===0?s:({...s,cart:[],orders:[{...order,id:`M${Date.now().toString().slice(-6)}`,items:s.cart,branchId:s.branchId,messages:[{text:'Olá! Recebemos seu pedido. Esta é uma conversa de demonstração — deixe sua mensagem por aqui.',customer:false}]},...s.orders]})),
    message:(id,text)=>setState(s=>({...s,orders:s.orders.map(o=>o.id===id?{...o,messages:[...o.messages,{text,customer:true},{text:'Mensagem registrada na demonstração. Em uma loja real, nossa equipe responderia por aqui.',customer:false}]}:o)})),
  };
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
export function useBakery() { const value=useContext(Context); if(!value) throw new Error('BakeryProvider is required'); return value; }