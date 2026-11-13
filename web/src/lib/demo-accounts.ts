import { products, subtotal, type CartItem } from './bakery';

export const demoAccounts = [
  { id:'empresa', name:'Empresa · Aurora Eventos', email:'empresa@demo.maison.test', password:'EmpresaDemo2026', role:'company', branchId:'jardins' },
  { id:'pessoa', name:'Pessoa física · Ana Lima', email:'pessoa@demo.maison.test', password:'PessoaDemo2026', role:'customer', branchId:'pinheiros' },
  { id:'administrador', name:'Administrador de teste', email:'admin@demo.maison.test', password:'AdminDemo2026', role:'admin', branchId:'jardins' },
  { id:'funcionario', name:'Funcionário · Maison Jardins', email:'loja@demo.maison.test', password:'LojaDemo2026', role:'employee', branchId:'jardins' },
] as const;
export type DemoAccount = typeof demoAccounts[number];
export type DemoOrder = { id:string; items:CartItem[]; total:number; method:string; date:string; time:string; address:string; branchId:string; customerDemoId:string; status:DemoOrderStatus; messages:{text:string;customer:boolean}[] };
export type DemoOrderStatus='scheduled'|'preparing'|'delivering'|'cancelled';
export const demoOrderStatuses:Record<DemoOrderStatus,string>={scheduled:'Vai ser feito',preparing:'Sendo feito',delivering:'Sendo entregue',cancelled:'Cancelado'};
export function normalizeDemoStatus(status:unknown):DemoOrderStatus{if(status==='preparing'||status==='delivering'||status==='cancelled'||status==='scheduled')return status;if(status==='ready')return 'delivering';return 'scheduled';}
export function authenticateDemo(email:string,password:string) { return demoAccounts.find(a=>a.email===email.trim().toLowerCase()&&a.password===password)??null; }
function item(id:string,quantity:number):CartItem { const p=products.find(p=>p.id===id); if(!p)throw new Error('Produto de teste ausente');return {...p,productId:p.id,quantity,requiresPreparation:p.category==='Combos',...(p.category==='Combos'?{preparation:'fried' as const}:{})}; }
export function seedDemoOrders():DemoOrder[] {
  const specs=[{id:'DEMO1001',owner:'empresa',branch:'jardins',items:[item('rainha-da-festa',120),item('ouro-derretido',80),item('combo-festa',6)]},{id:'DEMO1002',owner:'empresa',branch:'moema',items:[item('croissant',50),item('brownie',40)]},{id:'DEMO2001',owner:'pessoa',branch:'pinheiros',items:[item('brownie',2),item('bread',1)]},{id:'DEMO2002',owner:'pessoa',branch:'pinheiros',items:[item('cheese',3)]}];
  const date=new Date().toISOString().slice(0,10);
  return specs.map(s=>({id:s.id,items:s.items,total:subtotal(s.items),method:'pickup',date,time:'15:00',address:'',branchId:s.branch,customerDemoId:s.owner,status:'scheduled',messages:[{text:'Pedido fictício para testes. Nenhuma encomenda real será enviada.',customer:false}]}));
}
export function visibleDemoOrders<T extends {customerDemoId?:string;branchId:string}>(account:DemoAccount,orders:T[]):T[] {return orders.filter(o=>account.role==='admin'||(account.role==='employee'?o.branchId===account.branchId:o.customerDemoId===account.id));}
export function canManageDemoOrder(account:DemoAccount,order:{branchId:string}) {return account.role==='admin'||(account.role==='employee'&&account.branchId===order.branchId);}