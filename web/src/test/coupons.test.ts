import { describe, expect, it } from 'vitest';
import { couponDiscount, giveCoupon, redeemable, saveCoupon, seedCoupons, toggleCoupon } from '@/lib/coupons';
import { promoPrice } from '@/lib/promotions';
describe('coupons', () => {
  it('only admins create and activate coupons', () => {
    expect(saveCoupon('employee', seedCoupons, 'X5', 5)).toBe(seedCoupons);
    const created = saveCoupon('admin', seedCoupons, 'x5', 5);
    expect(created.find(c=>c.code==='X5')?.active).toBe(false);
    expect(toggleCoupon('employee', created, 'X5')).toBe(created);
    expect(toggleCoupon('admin', created, 'X5').find(c=>c.code==='X5')?.active).toBe(true);
  });
  it('employees can only hand out active coupons', () => {
    expect(giveCoupon('employee', seedCoupons, 'NATAL20', 'pessoa').find(c=>c.code==='NATAL20')?.holders).toEqual([]);
    expect(giveCoupon('customer', seedCoupons, 'BEMVINDO10', 'empresa')).toBe(seedCoupons);
    expect(giveCoupon('employee', seedCoupons, 'BEMVINDO10', 'empresa').find(c=>c.code==='BEMVINDO10')?.holders).toContain('empresa');
  });
  it('customers redeem only their own active coupons', () => {
    expect(redeemable(seedCoupons, 'bemvindo10', 'pessoa')?.percent).toBe(10);
    expect(redeemable(seedCoupons, 'BEMVINDO10', 'empresa')).toBeNull();
    expect(couponDiscount(200, redeemable(seedCoupons, 'BEMVINDO10', 'pessoa'))).toBe(20);
  });
  it('applies menu promotions', () => { expect(promoPrice('piscina-da-paixao', 100)).toBe(80); expect(promoPrice('nao-existe', 100)).toBe(100); });
});
