import {describe,it,expect} from 'vitest';
import {authenticateDemo,canManageDemoOrder,demoAccounts,seedDemoOrders,visibleDemoOrders} from '@/lib/demo-accounts';
import {products,refreshCatalogItems} from '@/lib/bakery';
describe('Isolated test personas',()=>{
 it('provides exactly four test profiles',()=>expect(demoAccounts.map(a=>a.role)).toEqual(['company','customer','admin','employee']));
 it('rejects invalid test passwords',()=>expect(authenticateDemo(demoAccounts[0].email,'invalid')).toBeNull());
 it('opens each advertised demo login',()=>{for(const a of demoAccounts)expect(authenticateDemo(a.email,a.password)?.id).toBe(a.id);});
 it('gives the company a large order of 206 items',()=>expect(seedDemoOrders()[0]?.items.reduce((n,i)=>n+i.quantity,0)).toBe(206));
 it('gives the individual only two small orders',()=>{const orders=visibleDemoOrders(demoAccounts[1],seedDemoOrders());expect(orders.length).toBe(2);expect(orders.map(o=>o.items.reduce((n,i)=>n+i.quantity,0))).toEqual([3,3]);});
 it('shows all four orders to the demo administrator',()=>expect(visibleDemoOrders(demoAccounts[2],seedDemoOrders()).length).toBe(4));
 it('scopes staff to Jardins only',()=>expect(visibleDemoOrders(demoAccounts[3],seedDemoOrders()).map(o=>o.id)).toEqual(['DEMO1001']));
 it('does not allow customers to manage orders',()=>expect(canManageDemoOrder(demoAccounts[0],{branchId:'jardins'})).toBe(false));
 it('does not allow staff to manage another branch',()=>expect(canManageDemoOrder(demoAccounts[3],{branchId:'moema'})).toBe(false));
});
describe('Renewed menu',()=>{
 it('adds exactly five breads to the existing two',()=>expect(products.filter(p=>p.category==='Pães').map(p=>p.id)).toEqual(['croissant','bread','pao-frances','brioche','pao-integral','focaccia','pao-de-leite']));
 it('removes beverages from the menu',()=>{expect(products.some(p=>p.category==='Bebidas')).toBe(false);expect(products.some(p=>p.id==='coffee')).toBe(false);});
 it('preserves the five existing prices',()=>expect(['croissant','cake','bread','cheese','brownie'].map(id=>products.find(p=>p.id===id)?.price)).toEqual([12.9,24.9,28,8.5,16.9]));
 it('removes withdrawn beverages from stored carts',()=>expect(refreshCatalogItems([{id:'coffee',name:'Coffee',image:'old.jpg',description:'',price:14.9,quantity:1}])).toEqual([]));
 it('preserves quantities and price when refreshing saved products',()=>{const p=products.find(p=>p.id==='bread');if(!p)throw new Error('Missing bread');expect(refreshCatalogItems([{...p,name:'Old',image:'old.jpg',quantity:3,price:27}])).toEqual([{...p,quantity:3,price:27}]);});
});