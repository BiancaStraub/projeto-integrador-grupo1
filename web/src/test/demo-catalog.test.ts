import {describe,it,expect} from 'vitest';
import {demoAccounts} from '@/lib/demo-accounts';
import {emptyDemoCatalog,saveDemoProduct,saveDemoCampaign,demoAvailability,demoPrice,demoCartBlocker,priceDemoCart} from '@/lib/demo-catalog';
const row={productId:'bread',branchId:'jardins',price:19.9,hidden:false,stock_status:'DISPONIVEL' as const,campaign_id:null};
const campaign={id:'00000000-0000-4000-8000-000000000001',name:'Natal',start_date:'2026-12-01',end_date:'2026-12-25',active:true};
describe('Demo administrator catalog rules',()=>{
 it('updates price to 19.90 only in the chosen branch',()=>{const c=saveDemoProduct(demoAccounts[2],emptyDemoCatalog,row);expect(demoPrice('bread','jardins',c,28)).toBe(19.9);expect(demoPrice('bread','moema',c,28)).toBe(28);});
 it('removes items from the catalog without deleting their settings',()=>{const c=saveDemoProduct(demoAccounts[2],emptyDemoCatalog,{...row,hidden:true});expect(c.products.length).toBe(1);expect(demoAvailability('bread','jardins',c,'2026-11-10').visible).toBe(false);});
 it('restores an item to the catalog',()=>{const c=saveDemoProduct(demoAccounts[2],emptyDemoCatalog,{...row,hidden:true});expect(demoAvailability('bread','jardins',saveDemoProduct(demoAccounts[2],c,row),'2026-11-10').visible).toBe(true);});
 it('keeps sold out products visible but blocks sale',()=>{const a=demoAvailability('bread','jardins',saveDemoProduct(demoAccounts[2],emptyDemoCatalog,{...row,stock_status:'ESGOTADO'}),'2026-11-10');expect(a.visible).toBe(true);expect(a.available).toBe(false);});
 it('limits seasonal products to active inclusive campaign dates',()=>{let c=saveDemoCampaign(demoAccounts[2],emptyDemoCatalog,campaign);c=saveDemoProduct(demoAccounts[2],c,{...row,campaign_id:campaign.id});expect(demoAvailability('bread','jardins',c,'2026-11-30').visible).toBe(false);expect(demoAvailability('bread','jardins',c,'2026-12-01').visible).toBe(true);expect(demoAvailability('bread','jardins',c,'2026-12-25').visible).toBe(true);expect(demoAvailability('bread','jardins',c,'2026-12-26').visible).toBe(false);expect(demoAvailability('bread','jardins',saveDemoCampaign(demoAccounts[2],c,{...campaign,active:false}),'2026-12-10').visible).toBe(false);});
 it('rejects reversed campaign dates',()=>expect(()=>saveDemoCampaign(demoAccounts[2],emptyDemoCatalog,{...campaign,end_date:'2026-11-01'})).toThrow());
 it('rejects zero and negative prices',()=>{for(const price of [0,-1])expect(()=>saveDemoProduct(demoAccounts[2],emptyDemoCatalog,{...row,price})).toThrow();});
 it('allows only demo administrators to edit products',()=>{for(const account of [demoAccounts[0],demoAccounts[1],demoAccounts[3],null])expect(()=>saveDemoProduct(account,emptyDemoCatalog,row)).toThrow();});
 it('allows only demo administrators to activate campaigns',()=>expect(()=>saveDemoCampaign(demoAccounts[3],emptyDemoCatalog,campaign)).toThrow());
 it('refreshes cart prices and blocks withdrawn cart items',()=>{const i={id:'bread',name:'Bread',description:'',image:'',quantity:2,price:28};const c=saveDemoProduct(demoAccounts[2],emptyDemoCatalog,{...row,hidden:true});expect(priceDemoCart([i],'jardins',c)[0]?.price).toBe(19.9);expect(demoCartBlocker([i],'jardins',c,'2026-11-10')).not.toBeNull();});
});
import {seededDemoCatalog,saveDemoStock} from '@/lib/demo-catalog';
import {normalizeDemoStatus} from '@/lib/demo-accounts';
describe('seasonal seed, staff stock and order statuses',()=>{
 it('shows Natal test items in November 2026 and hides paused Junina items',()=>{expect(demoAvailability('veludo-real','jardins',seededDemoCatalog,'2026-11-10').visible).toBe(true);expect(demoAvailability('orgulho-mineiro','jardins',seededDemoCatalog,'2026-11-10').visible).toBe(false);});
 it('lets employees mark stock sold out in their own branch only',()=>{const c=saveDemoStock(demoAccounts[3],seededDemoCatalog,'bread','jardins','ESGOTADO');expect(demoAvailability('bread','jardins',c,'2026-11-10').available).toBe(false);expect(()=>saveDemoStock(demoAccounts[3],seededDemoCatalog,'bread','moema','ESGOTADO')).toThrow();});
 it('does not let customers change stock',()=>{for(const a of [demoAccounts[0],demoAccounts[1]])expect(()=>saveDemoStock(a,seededDemoCatalog,'bread','jardins','ESGOTADO')).toThrow();});
 it('maps legacy statuses to the four new ones',()=>{expect(normalizeDemoStatus('pending')).toBe('scheduled');expect(normalizeDemoStatus('ready')).toBe('delivering');expect(normalizeDemoStatus('cancelled')).toBe('cancelled');});
});
