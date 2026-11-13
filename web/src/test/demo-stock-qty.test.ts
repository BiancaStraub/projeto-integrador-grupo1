import {describe,it,expect} from 'vitest';
import {consumeDemoStock,demoAvailability,demoStockQty,saveDemoStock,DEFAULT_STOCK_QTY,emptyDemoCatalog} from '@/lib/demo-catalog';
import {products} from '@/lib/bakery';
import {demoAccounts} from '@/lib/demo-accounts';
const p=products[0]!;const admin=demoAccounts.find(a=>a.role==='admin')!;
const item=(q:number)=>({...p,productId:p.id,quantity:q}) as never;
describe('estoque por unidades',()=>{
 it('começa com o estoque padrão',()=>expect(demoStockQty(p.id,'jardins',emptyDemoCatalog)).toBe(DEFAULT_STOCK_QTY));
 it('pedido desconta unidades da loja',()=>{const c=consumeDemoStock(emptyDemoCatalog,[item(3)],'jardins');expect(demoStockQty(p.id,'jardins',c)).toBe(DEFAULT_STOCK_QTY-3);expect(demoStockQty(p.id,'moema',c)).toBe(DEFAULT_STOCK_QTY);});
 it('ao zerar fica esgotado automaticamente',()=>{const c=consumeDemoStock(emptyDemoCatalog,[item(DEFAULT_STOCK_QTY)],'jardins');const a=demoAvailability(p.id,'jardins',c,'2026-11-11');expect(a.status).toBe('ESGOTADO');expect(a.available).toBe(false);});
 it('repor unidades volta a disponível',()=>{const c=consumeDemoStock(emptyDemoCatalog,[item(DEFAULT_STOCK_QTY)],'jardins');const r=saveDemoStock(admin,c,p.id,'jardins','DISPONIVEL',5);expect(demoAvailability(p.id,'jardins',r,'2026-11-11').available).toBe(true);});
});
