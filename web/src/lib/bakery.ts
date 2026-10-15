import croissant from '@/assets/croissant.jpg';
import cake from '@/assets/cake.jpg';
import bread from '@/assets/bread.jpg';
import cheese from '@/assets/cheese.jpg';
import brownie from '@/assets/brownie.jpg';
import coffee from '@/assets/coffee.jpg';

export const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
export const products = [
  { id:'croissant', name:'Croissant de manteiga', description:'Folhado delicado, manteiga de verdade.', price:12.9, category:'Pães', image:croissant, tag:'Mais amado' },
  { id:'cake', name:'Fatia de bolo de morango', description:'Massa leve, creme e morangos frescos.', price:24.9, category:'Bolos', image:cake, tag:'Feito com carinho' },
  { id:'bread', name:'Pão de fermentação natural', description:'Casca crocante e 24h de fermentação.', price:28, category:'Pães', image:bread, tag:'' },
  { id:'cheese', name:'Pão de queijo artesanal', description:'Queijo da Serra, quentinho por dentro.', price:8.5, category:'Salgados', image:cheese, tag:'' },
  { id:'brownie', name:'Brownie de chocolate', description:'Chocolate intenso e um centro macio.', price:16.9, category:'Doces', image:brownie, tag:'Favorito da casa' },
  { id:'coffee', name:'Cappuccino da casa', description:'Espresso especial e leite cremoso.', price:14.9, category:'Bebidas', image:coffee, tag:'' },
];
export const branches = [
  { id:'jardins', name:'Jardins', address:'Alameda Lorena, 1250 · São Paulo', latitude:-23.5666, longitude:-46.6632 },
  { id:'pinheiros', name:'Pinheiros', address:'Rua dos Pinheiros, 480 · São Paulo', latitude:-23.567, longitude:-46.687 },
  { id:'moema', name:'Moema', address:'Av. Moema, 310 · São Paulo', latitude:-23.602, longitude:-46.662 },
];
export type CakeConfig = { shape:string; size:15|20|25; dough:string; fillings:string[]; note:string };
export const defaultCake: CakeConfig = { shape:'Redondo', size:15, dough:'Baunilha', fillings:[], note:'' };
export const cakeSizes = [{size:15 as const,slices:10,price:120},{size:20 as const,slices:20,price:180},{size:25 as const,slices:30,price:240}];
export function toggleFilling(current:string[], flavor:string) { return current.includes(flavor) ? current.filter(f=>f!==flavor) : current.length<2 ? [...current,flavor] : current; }
export function cakePrice(config:CakeConfig) { return (cakeSizes.find(s=>s.size===config.size)?.price ?? 120) + (config.shape==='Coração'?20:0) + (config.dough==='Red Velvet'?15:0) + config.fillings.length*10; }
export type CartItem = { id:string; name:string; description:string; price:number; image:string; quantity:number; cake?:CakeConfig };
export const subtotal = (items:CartItem[]) => items.reduce((sum,item)=>sum+item.price*item.quantity,0);
export const deliveryFee = (method:string) => method==='delivery'?12:0;
export const pageHead = (title:string, description:string) => ({ meta:[{title:`${title} | Maison — Padaria & Doceria`},{name:'description',content:description},{property:'og:title',content:`${title} | Maison`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] });