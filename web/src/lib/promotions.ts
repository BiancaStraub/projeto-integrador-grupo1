/** Menu promotions: a percentage off selected catalog products. */
export const promotions = [
  { productId:'brioche', percent:15, label:'Café da manhã' },
  { productId:'folhas-de-ouro', percent:10, label:'Semana do croissant' },
  { productId:'combo-festa', percent:12, label:'Festa em casa' },
  { productId:'piscina-da-paixao', percent:20, label:'Doce da semana' },
] as const;
export const promotionFor = (id:string) => promotions.find(p=>p.productId===id) ?? null;
export const promoPrice = (id:string, price:number) => { const p=promotionFor(id); return p ? Math.round(price*(100-p.percent))/100 : price; };
