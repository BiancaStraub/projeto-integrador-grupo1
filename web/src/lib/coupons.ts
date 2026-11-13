/** Demo coupons: admins create and activate them, employees hand active ones to customers, customers redeem their own. */
export type Coupon = { code:string; percent:number; active:boolean; holders:string[] };
export const seedCoupons:Coupon[] = [
  { code:'BEMVINDO10', percent:10, active:true, holders:['pessoa'] },
  { code:'EMPRESA15', percent:15, active:true, holders:['empresa'] },
  { code:'NATAL20', percent:20, active:false, holders:[] },
];
type Role = 'admin'|'employee'|'company'|'customer';
const clean = (code:string) => code.trim().toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,20);
export function saveCoupon(role:Role, list:Coupon[], code:string, percent:number):Coupon[] {
  const c=clean(code); if(role!=='admin'||!c||!(percent>=1&&percent<=50)||list.some(x=>x.code===c)) return list;
  return [...list,{code:c,percent:Math.round(percent),active:false,holders:[]}];
}
export function toggleCoupon(role:Role, list:Coupon[], code:string):Coupon[] {
  return role==='admin'?list.map(c=>c.code===code?{...c,active:!c.active}:c):list;
}
export function giveCoupon(role:Role, list:Coupon[], code:string, customerId:string):Coupon[] {
  if(role!=='employee'&&role!=='admin') return list;
  return list.map(c=>c.code===code&&c.active&&!c.holders.includes(customerId)?{...c,holders:[...c.holders,customerId]}:c);
}
export function redeemable(list:Coupon[], code:string, customerId:string):Coupon|null {
  const c=list.find(x=>x.code===clean(code)); return c&&c.active&&c.holders.includes(customerId)?c:null;
}
export const couponDiscount = (subtotal:number, coupon:Coupon|null) => coupon?Math.round(subtotal*coupon.percent)/100:0;
