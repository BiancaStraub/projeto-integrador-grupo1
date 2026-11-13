import {z} from 'zod';
import type {CartItem} from './bakery';
import {products} from './bakery';
import {campaignSchema,emptyCatalog,productAvailability,type CatalogSettings} from './store-catalog';
import type {DemoAccount} from './demo-accounts';
export type DemoProductSetting={productId:string;branchId:string;price:number;hidden:boolean;stock_status:'DISPONIVEL'|'ESGOTADO'|'EM_PRODUCAO';campaign_id:string|null;stock_qty?:number|undefined};
export type DemoCatalog={products:DemoProductSetting[];campaigns:CatalogSettings['campaigns']};
export const emptyDemoCatalog:DemoCatalog={products:[],campaigns:[]};
export const demoProductSchema=z.object({productId:z.string().min(1),branchId:z.enum(['jardins','pinheiros','moema']),price:z.number().finite().positive().max(1000000).refine(n=>Math.abs(n*100-Math.round(n*100))<0.000001,'Use no máximo duas casas decimais.'),hidden:z.boolean(),stock_status:z.enum(['DISPONIVEL','ESGOTADO','EM_PRODUCAO']),campaign_id:z.string().nullable(),stock_qty:z.number().int().min(0).max(100000).optional()});
export function saveDemoProduct(account:DemoAccount|null,catalog:DemoCatalog,input:DemoProductSetting):DemoCatalog {
 if(account?.role!=='admin')throw new Error('Somente o administrador de teste pode alterar o catálogo.');
 const row=demoProductSchema.parse(input);
 if(row.campaign_id&&!catalog.campaigns.some(c=>c.id===row.campaign_id))throw new Error('Escolha uma campanha existente.');
 return {...catalog,products:[...catalog.products.filter(p=>p.productId!==row.productId||p.branchId!==row.branchId),row]};
}
export function saveDemoCampaign(account:DemoAccount|null,catalog:DemoCatalog,input:CatalogSettings['campaigns'][number]):DemoCatalog {
 if(account?.role!=='admin')throw new Error('Somente o administrador de teste pode alterar campanhas.');
 const row=campaignSchema.parse(input);if(!row.id)throw new Error('Campanha sem identificação.');
 return {...catalog,campaigns:[...catalog.campaigns.filter(c=>c.id!==row.id),{...row,id:row.id}]};
}
export function demoSettings(catalog:DemoCatalog):CatalogSettings {return {campaigns:catalog.campaigns,settings:catalog.products.map(p=>({product_id:p.productId,branch_id:p.branchId,stock_status:p.stock_status,campaign_id:p.campaign_id}))};}
/** Units each product starts with per branch until someone sets a quantity. */
export const DEFAULT_STOCK_QTY=20;
export function demoStockQty(id:string,branch:string,catalog:DemoCatalog){return catalog.products.find(p=>p.productId===id&&p.branchId===branch)?.stock_qty??DEFAULT_STOCK_QTY;}
/** Zero units always means sold out, whatever status was chosen. */
export function demoAvailability(id:string,branch:string,catalog:DemoCatalog,day:string){const result=productAvailability(id,branch,demoSettings(catalog),day);const hidden=catalog.products.find(p=>p.productId===id&&p.branchId===branch)?.hidden??false;const qty=demoStockQty(id,branch,catalog);const status=qty<=0?'ESGOTADO' as const:result.status;return {...result,status,qty,visible:result.visible&&!hidden,available:result.visible&&!hidden&&status==='DISPONIVEL'};}
/** Simulated order: subtract sold units in the branch; reaching zero turns the product sold out. */
export function consumeDemoStock(catalog:DemoCatalog,items:CartItem[],branch:string):DemoCatalog{
 let next=catalog;
 for(const i of items){if(i.cake)continue;const id=i.productId??i.id;const base=products.find(p=>p.id===id);if(!base)continue;const current=next.products.find(p=>p.productId===id&&p.branchId===branch);const qty=Math.max(0,demoStockQty(id,branch,next)-i.quantity);
  const row:DemoProductSetting={...(current??{productId:id,branchId:branch,price:base.price,hidden:false,campaign_id:null,stock_status:'DISPONIVEL'}),stock_qty:qty,...(qty===0?{stock_status:'ESGOTADO' as const}:{})};
  next={...next,products:[...next.products.filter(p=>p!==current),row]};}
 return next;
}
export function demoPrice(id:string,branch:string,catalog:DemoCatalog,base:number){return catalog.products.find(p=>p.productId===id&&p.branchId===branch)?.price??base;}
export function priceDemoCart(items:CartItem[],branch:string,catalog:DemoCatalog):CartItem[]{return items.map(i=>i.cake?i:{...i,price:demoPrice(i.productId??i.id,branch,catalog,i.price)});}
export function demoCartBlocker(items:CartItem[],branch:string,catalog:DemoCatalog,day:string){if(items.some(i=>!i.cake&&!demoAvailability(i.productId??i.id,branch,catalog,day).available))return 'Há itens indisponíveis na sua loja. Remova-os para continuar.';if(items.some(i=>!i.cake&&i.quantity>demoStockQty(i.productId??i.id,branch,catalog)))return 'Alguns itens têm mais unidades no carrinho do que o estoque da loja.';if(items.some(i=>i.requiresPreparation&&!i.preparation))return 'Escolha o preparo de cada combo antes de finalizar.';return null;}
const seasonalSeed=[{id:'demo-natal',name:'Natal Maison (teste)',start_date:'2026-11-01',end_date:'2026-12-31',active:true,items:['folhas-de-ouro','veludo-real','brioche']},{id:'demo-junina',name:'Festa Junina (teste)',start_date:'2027-06-01',end_date:'2027-06-30',active:false,items:['orgulho-mineiro','abraco-de-vo']}];
/** Test seasonal campaigns and products, merged without overwriting admin edits. */
export function withSeasonalSeed(catalog:DemoCatalog):DemoCatalog{
 let next=catalog;
 for(const c of seasonalSeed){if(next.campaigns.some(x=>x.id===c.id))continue;const {items,...campaign}=c;next={campaigns:[...next.campaigns,campaign],products:[...next.products,...items.flatMap(id=>(['jardins','pinheiros','moema'] as const).filter(b=>!next.products.some(p=>p.productId===id&&p.branchId===b)).map(b=>({productId:id,branchId:b,price:products.find(p=>p.id===id)?.price??1,hidden:false,stock_status:'DISPONIVEL' as const,campaign_id:c.id})))]};}
 return next;
}
export const seededDemoCatalog=withSeasonalSeed(emptyDemoCatalog);
/** Employees change stock only in their own branch; administrators in any branch. */
export function saveDemoStock(account:DemoAccount|null,catalog:DemoCatalog,productId:string,branchId:string,stock_status:DemoProductSetting['stock_status'],stock_qty?:number):DemoCatalog{
 if(!account||!(account.role==='admin'||(account.role==='employee'&&account.branchId===branchId)))throw new Error('Sem permissão para alterar o estoque desta filial.');
 const current=catalog.products.find(p=>p.productId===productId&&p.branchId===branchId);const base=products.find(p=>p.id===productId);if(!base)throw new Error('Produto inexistente.');
 const row=demoProductSchema.parse({...(current??{productId,branchId,price:base.price,hidden:false,campaign_id:null}),stock_status,...(stock_qty!==undefined?{stock_qty}:{})});
 if(row.stock_qty!==undefined&&row.stock_qty>0&&row.stock_status==='ESGOTADO'&&stock_qty!==undefined&&current?.stock_qty===0)row.stock_status='DISPONIVEL';
 return {...catalog,products:[...catalog.products.filter(p=>p!==current),row]};
}
