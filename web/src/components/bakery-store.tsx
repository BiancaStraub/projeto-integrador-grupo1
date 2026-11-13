import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { branches, refreshCatalogItems, type CartItem } from '@/lib/bakery';
import {seededDemoCatalog as emptyDemoCatalog,withSeasonalSeed,saveDemoStock,consumeDemoStock,saveDemoProduct,saveDemoCampaign,priceDemoCart,type DemoCatalog,type DemoProductSetting} from '@/lib/demo-catalog';
import { promoPrice } from '@/lib/promotions';
import { seedCoupons, saveCoupon, toggleCoupon, giveCoupon, type Coupon } from '@/lib/coupons';
import type {Campaign} from '@/lib/store-catalog';
import { canManageDemoOrder, demoAccounts, seedDemoOrders, normalizeDemoStatus, type DemoAccount, type DemoOrderStatus } from '@/lib/demo-accounts';

export type Order = { id:string; items:CartItem[]; total:number; method:string; date:string; time:string; address:string; branchId:string; customerDemoId?:string; status?:DemoOrderStatus; payment?:string; review?:{rating:number;text:string}; coupon?:string; messages:{text:string;customer:boolean}[] };
type State = { branchId:string; selected:boolean; cart:CartItem[]; orders:Order[]; demoAccountId?:string|undefined; demoCarts?:Record<string,CartItem[]>; catalogDemo?:DemoCatalog; coupons?:Coupon[] };
const initial:State = {branchId:'jardins',selected:false,cart:[],orders:[]};
type Store = State & { ready:boolean; demoCatalog:DemoCatalog; saveDemoProduct:(row:DemoProductSetting)=>void; saveDemoCampaign:(row:Campaign)=>void; demoAccount:DemoAccount|null; demoStatus:(id:string,status:DemoOrderStatus)=>void; saveDemoStock:(productId:string,branchId:string,status:DemoProductSetting['stock_status'],qty?:number)=>void; startDemo:(id:string)=>void; endDemo:()=>void; setBranch:(id:string)=>void; add:(item:Omit<CartItem,'quantity'>)=>void; prepare:(id:string,preparation:'fried'|'frozen')=>void; quantity:(id:string,quantity:number)=>void; checkout:(order:Omit<Order,'id'|'items'|'messages'|'branchId'>)=>void; message:(id:string,text:string)=>void; review:(id:string,rating:number,text:string)=>void; coupons:Coupon[]; saveCoupon:(code:string,percent:number)=>void; toggleCoupon:(code:string)=>void; giveCoupon:(code:string,customerId:string)=>void };
const Context = createContext<Store|null>(null);
export function BakeryProvider({children}:{children:ReactNode}) {
  const [state,setState] = useState<State>(initial);
  const [ready,setReady] = useState(false);
  useEffect(()=>{try { const raw=localStorage.getItem('maison-demo-v1'); if(raw) { const data=JSON.parse(raw); if(Array.isArray(data.cart)&&Array.isArray(data.orders)&&branches.some(b=>b.id===data.branchId)) setState({...data,cart:refreshCatalogItems(data.cart),...(data.catalogDemo?{catalogDemo:withSeasonalSeed(data.catalogDemo)}:{}),orders:data.orders.map((o:Order)=>({...o,status:normalizeDemoStatus(o.status),items:refreshCatalogItems(o.items)}))}); } } catch { /* Use clean demo state if storage is unavailable. */ } setReady(true);},[]);
  useEffect(()=>{if(ready) { try {localStorage.setItem('maison-demo-v1',JSON.stringify(state));} catch { /* The current session remains usable without persistence. */ } }},[state,ready]);
  const withPromo=(items:CartItem[])=>items.map(i=>i.cake?i:{...i,price:promoPrice(i.productId??i.id,i.price)});
  const role=demoAccounts.find(a=>a.id===state.demoAccountId)?.role;
  const store:Store = {...state,ready,cart:withPromo(state.demoAccountId?priceDemoCart(state.cart,state.branchId,state.catalogDemo??emptyDemoCatalog):state.cart),coupons:state.coupons??seedCoupons,
    saveCoupon:(code,percent)=>{if(role)setState(s=>({...s,coupons:saveCoupon(role,s.coupons??seedCoupons,code,percent)}));},
    toggleCoupon:(code)=>{if(role)setState(s=>({...s,coupons:toggleCoupon(role,s.coupons??seedCoupons,code)}));},
    giveCoupon:(code,id)=>{if(role)setState(s=>({...s,coupons:giveCoupon(role,s.coupons??seedCoupons,code,id)}));},demoCatalog:state.catalogDemo??emptyDemoCatalog,
    saveDemoProduct:(row)=>{const next=saveDemoProduct(demoAccounts.find(a=>a.id===state.demoAccountId)??null,state.catalogDemo??emptyDemoCatalog,row);setState(s=>({...s,catalogDemo:next}));},
    saveDemoCampaign:(row)=>{const next=saveDemoCampaign(demoAccounts.find(a=>a.id===state.demoAccountId)??null,state.catalogDemo??emptyDemoCatalog,row);setState(s=>({...s,catalogDemo:next}));},
    saveDemoStock:(productId,branchId,status,qty)=>{const next=saveDemoStock(demoAccounts.find(a=>a.id===state.demoAccountId)??null,state.catalogDemo??emptyDemoCatalog,productId,branchId,status,qty);setState(s=>({...s,catalogDemo:next}));},
    demoAccount:demoAccounts.find(a=>a.id===state.demoAccountId)??null,
    demoStatus:(id,status)=>setState(s=>{const a=demoAccounts.find(a=>a.id===s.demoAccountId);if(!a)return s;return {...s,orders:s.orders.map(o=>o.id===id&&o.customerDemoId&&canManageDemoOrder(a,o)?{...o,status}:o)};}),
    startDemo:(id)=>{const account=demoAccounts.find(a=>a.id===id);if(!account)return;setState(s=>({...s,demoAccountId:id,branchId:account.branchId,selected:true,demoCarts:{...s.demoCarts,[s.demoAccountId??'guest']:s.cart},cart:refreshCatalogItems(s.demoCarts?.[id]??[]),orders:s.orders.some(o=>o.customerDemoId)?s.orders:[...seedDemoOrders(),...s.orders]}));},
    endDemo:()=>setState(s=>({...s,demoAccountId:undefined,demoCarts:{...s.demoCarts,[s.demoAccountId??'guest']:s.cart},cart:refreshCatalogItems(s.demoCarts?.['guest']??[])})),
    setBranch:(id)=>setState(s=>({...s,branchId:id,selected:true})),
    prepare:(id,preparation)=>setState(s=>({...s,cart:s.cart.map(i=>i.id===id?{...i,requiresPreparation:true,preparation}:i)})),
    add:(item)=>setState(s=>({...s,cart:s.cart.some(i=>i.id===item.id)?s.cart.map(i=>i.id===item.id?{...i,quantity:i.quantity+1}:i):[...s.cart,{...item,quantity:1}]})),
    quantity:(id,value)=>setState(s=>({...s,cart:value<=0?s.cart.filter(i=>i.id!==id):s.cart.map(i=>i.id===id?{...i,quantity:value}:i)})),
    checkout:(order)=>setState(s=>s.cart.length===0?s:({...s,cart:[],...(s.demoAccountId?{catalogDemo:consumeDemoStock(s.catalogDemo??emptyDemoCatalog,s.cart,s.branchId)}:{}),orders:[{...order,...(s.demoAccountId?{customerDemoId:s.demoAccountId}:{}),status:'scheduled',id:`M${Date.now().toString().slice(-6)}`,items:withPromo(s.demoAccountId?priceDemoCart(s.cart,s.branchId,s.catalogDemo??emptyDemoCatalog):s.cart),branchId:s.branchId,messages:[{text:'Olá! Recebemos seu pedido. Esta é uma conversa de demonstração — deixe sua mensagem por aqui.',customer:false}]},...s.orders]})),
    review:(id,rating,text)=>setState(s=>({...s,orders:s.orders.map(o=>o.id===id?{...o,review:{rating:Math.min(5,Math.max(1,Math.round(rating))),text:text.slice(0,500)}}:o)})),
    message:(id,text)=>setState(s=>({...s,orders:s.orders.map(o=>o.id===id?{...o,messages:[...o.messages,{text,customer:true},{text:'Mensagem registrada na demonstração. Em uma loja real, nossa equipe responderia por aqui.',customer:false}]}:o)})),
  };
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
export function useBakery() { const value=useContext(Context); if(!value) throw new Error('BakeryProvider is required'); return value; }