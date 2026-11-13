import { describe, expect, it } from 'vitest';
import { cartBlocker, productAvailability, campaignSchema, type CatalogSettings } from '@/lib/store-catalog';
const catalog: CatalogSettings = { campaigns: [{ id:'c', name:'Natal', start_date:'2026-12-01', end_date:'2026-12-25', active:true }], settings: [{product_id:'combo',branch_id:'jardins',stock_status:'DISPONIVEL',campaign_id:'c'}, {product_id:'pao',branch_id:'jardins',stock_status:'ESGOTADO',campaign_id:null},{product_id:'bolo',branch_id:'jardins',stock_status:'EM_PRODUCAO',campaign_id:null}] };
describe('Store management rules', () => {
  it('pauses sales for ESGOTADO without hiding the item',()=>{expect(productAvailability('pao','jardins',catalog,'2026-12-10')).toMatchObject({visible:true,available:false});});
  it('pauses sales for EM_PRODUCAO',()=>{expect(productAvailability('bolo','jardins',catalog,'2026-12-10').available).toBe(false);});
  it('keeps stock scoped to the selected branch',()=>{expect(productAvailability('pao','moema',catalog,'2026-12-10').available).toBe(true);});
  it('requires fried or frozen preparation for combos',()=>{expect(cartBlocker([{id:'combo',requiresPreparation:true}],'jardins',catalog,'2026-12-10')).not.toBeNull();for(const preparation of ['fried','frozen'] as const) expect(cartBlocker([{id:'combo',requiresPreparation:true,preparation}],'jardins',catalog,'2026-12-10')).toBeNull();});
  it('shows linked products only inside scheduled inclusive dates',()=>{for(const day of ['2026-11-30','2026-12-26'])expect(productAvailability('combo','jardins',catalog,day).visible).toBe(false);for(const day of ['2026-12-01','2026-12-25'])expect(productAvailability('combo','jardins',catalog,day).visible).toBe(true);});
  it('hides linked products when a campaign is inactive',()=>{expect(productAvailability('combo','jardins',{...catalog,campaigns:catalog.campaigns.map(c=>({...c,active:false}))},'2026-12-10').visible).toBe(false);});
  it('blocks checkout for unavailable items',()=>{expect(cartBlocker([{id:'pao'}],'jardins',catalog,'2026-12-10')).not.toBeNull();});
  it('rejects an inverted campaign period',()=>{expect(campaignSchema.safeParse({name:'Natal',start_date:'2026-12-25',end_date:'2026-12-01',active:true}).success).toBe(false);});
});