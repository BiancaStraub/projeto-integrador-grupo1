import croissant from '@/assets/croissant-fornada-dourada.jpg';
import cake from '@/assets/fatia-jardim-morango.jpg';
import bread from '@/assets/pao-raizes-da-casa.jpg';
import cheese from '@/assets/pao-queijo-perolas-serra.jpg';
import brownie from '@/assets/brownie-cacau-afeto.jpg';
import frances from '@/assets/pao-frances-amanhecer.jpg';
import brioche from '@/assets/brioche-nuvem-manteiga.jpg';
import integral from '@/assets/pao-integral-campo.jpg';
import focaccia from '@/assets/focaccia-jardim-alecrim.jpg';
import leite from '@/assets/pao-leite-laco-carinho.jpg';
import comboFesta from '@/assets/combo-festa-coxinhas-bolo-chocolate.jpg.asset.json';
import piscinaDaPaixao from '@/assets/torta-piscina-da-paixao-morango.jpg.asset.json';
import tortaLimao from '@/assets/torta-limao-suspiro-de-verao.jpg';
import boloCenoura from '@/assets/bolo-cenoura-erupcao-de-alegria.jpg';
import cheesecake from '@/assets/cheesecake-nuvem-do-bosque.jpg';
import pave from '@/assets/pave-abraco-de-vo.jpg';
import milFolhas from '@/assets/mil-folhas-folhas-de-ouro.jpg';
import pudim from '@/assets/pudim-espelho-doce.jpg';
import tortaHolandesa from '@/assets/torta-holandesa-segredo-europeu.jpg';
import redVelvet from '@/assets/bolo-red-velvet-veludo-real.jpg';
import coxinha from '@/assets/coxinha-rainha-da-festa.jpg';
import bolinhaQueijo from '@/assets/bolinha-queijo-ouro-derretido.jpg';
import risolis from '@/assets/risolis-carne-meia-lua.jpg';
import kibe from '@/assets/kibe-tesouro-arabe.jpg';
import empadinha from '@/assets/empadinha-palmito-casquinha.jpg';
import esfiha from '@/assets/esfiha-carne-classico.jpg';
import enroladinho from '@/assets/enroladinho-salsicha-abraco.jpg';
import croquete from '@/assets/croquete-carne-crocancia.jpg';
import pastelzinho from '@/assets/pastelzinho-queijo-brisa.jpg';
import paoQueijoRecheado from '@/assets/pao-queijo-recheado-orgulho.jpg';

export const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
export const products = [
  { id:'croissant', name:'Fornada Dourada', description:'Croissant de manteiga com delicadas camadas crocantes.', price:12.9, category:'Pães', image:croissant, tag:'Mais amado' },
  { id:'cake', name:'Jardim de Morangos', description:'Fatia de bolo de baunilha, creme e morangos frescos.', price:24.9, category:'Bolos', image:cake, tag:'Feito com carinho' },
  { id:'bread', name:'Raízes da Casa', description:'Pão de fermentação natural com casca crocante.', price:28, category:'Pães', image:bread, tag:'' },
  { id:'cheese', name:'Pérolas da Serra', description:'Pão de queijo artesanal, quentinho por dentro.', price:8.5, category:'Salgados', image:cheese, tag:'' },
  { id:'brownie', name:'Cacau & Afeto', description:'Brownie de chocolate intenso e centro macio.', price:16.9, category:'Doces', image:brownie, tag:'Favorito da casa' },
  { id:'pao-frances', name:'Amanhecer Crocante', description:'Pão francês de casca dourada e miolo leve · unidade.', price:2.5, category:'Pães', image:frances, tag:'Novidade' },
  { id:'brioche', name:'Nuvem de Manteiga', description:'Brioche amanteigado, macio e delicado · pão inteiro.', price:24.9, category:'Pães', image:brioche, tag:'Novidade' },
  { id:'pao-integral', name:'Essência do Campo', description:'Pão integral com aveia e sementes · pão inteiro.', price:22.9, category:'Pães', image:integral, tag:'Novidade' },
  { id:'focaccia', name:'Jardim de Alecrim', description:'Focaccia artesanal com azeite e alecrim · porção.', price:16.9, category:'Pães', image:focaccia, tag:'Novidade' },
  { id:'pao-de-leite', name:'Laço de Carinho', description:'Pão de leite com miolo fofinho · unidade.', price:4.9, category:'Pães', image:leite, tag:'Novidade' },
  { id:'combo-festa', name:'Combo de festa', description:'Caixa de coxinhas douradas, bolinhas de queijo e bolo de chocolate.', price:189.9, category:'Combos', image:comboFesta.url, tag:'Para compartilhar' },
  { id:'piscina-da-paixao', name:'Piscina da Paixão', description:'Torta de morango com creme de baunilha e toque de pâtisserie fina.', price:149.9, category:'Bolos', image:piscinaDaPaixao.url, tag:'Novidade' },
  { id:'suspiro-de-verao', name:'Suspiro de Verão', description:'Torta de limão com merengue tostado na hora.', price:119.9, category:'Doces', image:tortaLimao, tag:'' },
  { id:'erupcao-de-alegria', name:'Erupção de Alegria', description:'Bolo de cenoura com vulcão de brigadeiro.', price:99.9, category:'Doces', image:boloCenoura, tag:'Favorito da casa' },
  { id:'nuvem-do-bosque', name:'Nuvem do Bosque', description:'Cheesecake cremoso com frutas vermelhas frescas.', price:139.9, category:'Doces', image:cheesecake, tag:'' },
  { id:'abraco-de-vo', name:'Abraço de Vó', description:'Pavê de doce de leite em camadas generosas.', price:89.9, category:'Doces', image:pave, tag:'' },
  { id:'folhas-de-ouro', name:'Folhas de Ouro', description:'Mil folhas de baunilha com massa folhada crocante.', price:109.9, category:'Doces', image:milFolhas, tag:'' },
  { id:'espelho-doce', name:'Espelho Doce', description:'Pudim de leite condensado com calda de caramelo.', price:79.9, category:'Doces', image:pudim, tag:'' },
  { id:'segredo-europeu', name:'Segredo Europeu', description:'Torta holandesa com ganache e raspas de chocolate.', price:129.9, category:'Doces', image:tortaHolandesa, tag:'' },
  { id:'veludo-real', name:'Veludo Real', description:'Bolo Red Velvet tradicional com cream cheese.', price:159.9, category:'Doces', image:redVelvet, tag:'' },
  { id:'rainha-da-festa', name:'A Rainha da Festa', description:'Coxinha de frango com catupiry, dourada e crocante.', price:9.9, category:'Salgados', image:coxinha, tag:'Mais amado' },
  { id:'ouro-derretido', name:'Ouro Derretido', description:'Bolinha de queijo com coração cremoso.', price:8.9, category:'Salgados', image:bolinhaQueijo, tag:'' },
  { id:'meia-lua-saborosa', name:'Meia-Lua Saborosa', description:'Risólis de carne com casquinha crocante.', price:9.5, category:'Salgados', image:risolis, tag:'' },
  { id:'tesouro-arabe', name:'Tesouro Árabe', description:'Kibe recheado com carne temperada e hortelã.', price:10.9, category:'Salgados', image:kibe, tag:'' },
  { id:'casquinha-perfeita', name:'Casquinha Perfeita', description:'Empadinha de palmito com massa amanteigada.', price:9.9, category:'Salgados', image:empadinha, tag:'' },
  { id:'classico-de-domingo', name:'Clássico de Domingo', description:'Esfiha de carne aberta, suculenta e temperada.', price:9.9, category:'Salgados', image:esfiha, tag:'' },
  { id:'abraco-quentinho', name:'Abraço Quentinho', description:'Enroladinho de salsicha em massa fofinha.', price:8.9, category:'Salgados', image:enroladinho, tag:'' },
  { id:'crocancia-absoluta', name:'Crocância Absoluta', description:'Croquete de carne desfiada, sequinho por fora.', price:9.5, category:'Salgados', image:croquete, tag:'' },
  { id:'brisa-salgada', name:'Brisa Salgada', description:'Pastelzinho de queijo com massa fina e estalinhos.', price:8.9, category:'Salgados', image:pastelzinho, tag:'' },
  { id:'orgulho-mineiro', name:'Orgulho Mineiro', description:'Pão de queijo recheado, quentinho e puxa-puxa.', price:10.9, category:'Salgados', image:paoQueijoRecheado, tag:'' },
];
export const branches = [
  { id:'jardins', name:'Jardins', address:'Alameda Lorena, 1250 · São Paulo', latitude:-23.5666, longitude:-46.6632 },
  { id:'pinheiros', name:'Pinheiros', address:'Rua dos Pinheiros, 480 · São Paulo', latitude:-23.567, longitude:-46.687 },
  { id:'moema', name:'Moema', address:'Av. Moema, 310 · São Paulo', latitude:-23.602, longitude:-46.662 },
];
export type CakeFrosting = 'ivory' | 'rose' | 'chocolate' | 'naked';
export const cakeFrostings = [{id:'ivory' as const,name:'Branca',swatch:'swatch-vanilla'}, {id:'chocolate' as const,name:'Chocolate',swatch:'swatch-chocolate'}, {id:'naked' as const,name:'Naked',swatch:'swatch-naked'}, {id:'rose' as const,name:'Rosa delicado',swatch:'swatch-rose'}];
const cakeFillingOrder = ['Creme de Baunilha', 'Brigadeiro', 'Doce de Leite', 'Morango'];
/** Photographed catalog combinations (always with flowers and red berries). */
export const catalogCakes = ['heart-1-vanilla-1-2-ivory','round-1-vanilla-0-ivory','square-2-vanilla-2-naked','heart-1-vanilla-1-chocolate','round-2-vanilla-0-3-ivory','square-1-vanilla-1-2-naked','round-1-chocolate-1-chocolate','heart-2-chocolate-3-naked','square-1-chocolate-2-chocolate','round-2-chocolate-0-3-ivory','heart-1-chocolate-1-2-naked','heart-2-velvet-0-naked','square-1-velvet-2-ivory','round-2-velvet-1-chocolate','heart-1-velvet-0-3-naked','square-2-velvet-1-2-ivory','square-2-vanilla-3-chocolate','round-1-velvet-1-naked','heart-2-chocolate-0-chocolate'];
export function catalogKey(config:CakeConfig, frosting:CakeFrosting = config.frosting ?? 'ivory') {
  if (!config.fillings.length) return null;
  const shape = config.shape === 'Quadrado' ? 'square' : config.shape === 'Coração' ? 'heart' : 'round';
  const dough = config.dough === 'Chocolate' ? 'chocolate' : config.dough === 'Baunilha' ? 'vanilla' : 'velvet';
  const fillings = cakeFillingOrder.flatMap((f, i) => config.fillings.includes(f) ? [i] : []).join('-');
  const key = `${shape}-${config.tiers ?? 1}-${dough}-${fillings}-${frosting}`;
  return catalogCakes.includes(key) ? key : null;
}
export function supportsRoseFrosting(config:CakeConfig) { return config.tiers===2 && Boolean(config.edibleFlowers && config.redBerries) && config.fillings.length===2 && config.fillings.includes('Doce de Leite') && config.fillings.includes('Morango'); }
export function supportsFrosting(config:CakeConfig, frosting:CakeFrosting) { return frosting==='rose' ? supportsRoseFrosting(config) : true; }
export function effectiveFrosting(config:CakeConfig):CakeFrosting { const f = config.frosting ?? 'ivory'; return supportsFrosting(config, f) ? f : 'ivory'; }
export function cakeFrostingName(config:CakeConfig) { return cakeFrostings.find(f=>f.id===effectiveFrosting(config))?.name ?? 'Branca'; }
export type CakeConfig = { shape:string; size:15|20|25; dough:string; fillings:string[]; note:string; tiers?:1|2; edibleFlowers?:boolean; redBerries?:boolean; frosting?:CakeFrosting };
export const defaultCake: CakeConfig = { shape:'Redondo', size:15, dough:'Baunilha', fillings:[], note:'' };
export const cakeSizes = [{size:15 as const,slices:10,price:120},{size:20 as const,slices:20,price:180},{size:25 as const,slices:30,price:240}];
export function toggleFilling(current:string[], flavor:string) { return current.includes(flavor) ? current.filter(f=>f!==flavor) : current.length<2 ? [...current,flavor] : current; }
export function cakePrice(config:CakeConfig) { return (cakeSizes.find(s=>s.size===config.size)?.price ?? 120) + (config.shape==='Coração'?20:0) + (config.dough==='Red Velvet'?15:0) + config.fillings.length*10; }
export type CartItem = { id:string; name:string; description:string; price:number; image:string; quantity:number; cake?:CakeConfig; productId?:string; requiresPreparation?:boolean; preparation?:'fried'|'frozen' };
export function refreshCatalogItems(items:CartItem[]):CartItem[] {return items.filter(i=>i.productId!=='coffee'&&i.id!=='coffee').map(i=>{if(i.cake)return i;const p=products.find(p=>p.id===(i.productId??i.id));return p?{...i,name:p.name,description:p.description,image:p.image}:i;});}
export const subtotal = (items:CartItem[]) => items.reduce((sum,item)=>sum+item.price*item.quantity,0);
export const deliveryFee = (method:string) => method==='delivery'?12:0;
export const pageHead = (title:string, description:string) => ({ meta:[{title:`${title} | Maison — Padaria & Doceria`},{name:'description',content:description},{property:'og:title',content:`${title} | Maison`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] });
/** Rebuilds the builder configuration that a catalog photo represents. */
export function catalogConfig(key:string):CakeConfig {
  const [shape, tiers, dough, ...rest] = key.split('-');
  const frosting = rest.pop() as CakeFrosting;
  return { shape: shape==='square'?'Quadrado':shape==='heart'?'Coração':'Redondo', size:20, tiers: Number(tiers) as 1|2, dough: dough==='chocolate'?'Chocolate':dough==='vanilla'?'Baunilha':'Red Velvet', fillings: rest.map(i=>cakeFillingOrder[Number(i)]).filter((f):f is string=>Boolean(f)), note:'', edibleFlowers:true, redBerries:true, frosting };
}

export const paymentMethods = { pix:'Pix', credit:'Cartão de crédito', debit:'Cartão de débito', onPickup:'Pagar na retirada' } as const;
export type PaymentMethod = keyof typeof paymentMethods;
/** Paying at the counter is only possible when the customer picks the order up. */
export const paymentOptions = (method:string):PaymentMethod[] => method==='pickup'?['pix','credit','debit','onPickup']:['pix','credit','debit'];
