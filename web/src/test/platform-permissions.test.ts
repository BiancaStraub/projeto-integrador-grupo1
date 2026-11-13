import {describe,it,expect} from 'vitest';
import {createClient} from '@supabase/supabase-js';
import type {Database} from '@/integrations/supabase/types';
const url=process.env['SUPABASE_URL'];const secret=process.env['SUPABASE_SERVICE_ROLE_KEY'];const key=process.env['SUPABASE_PUBLISHABLE_KEY'];
describe.skipIf(!url||!secret||!key)('Database permission boundaries',()=>{
 it('new users are clients and cannot promote themselves or read another customer profile',async()=>{
  if(!url||!secret||!key)throw new Error('Missing test environment');
  const admin=createClient<Database>(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
  const ids:string[]=[];
  try{
   const clients=[];
   for(let i=0;i<2;i++){
    const email=`maison-permission-${crypto.randomUUID()}@example.com`;const password=crypto.randomUUID()+'Aa9!';
    const {data,error}=await admin.auth.admin.createUser({email,password,email_confirm:true});if(error||!data.user)throw new Error('Test account creation failed');ids.push(data.user.id);
    const client=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false}});const signed=await client.auth.signInWithPassword({email,password});if(signed.error)throw new Error('Test login failed');clients.push(client);
   }
   const first=clients[0];const id=ids[0];const otherId=ids[1];if(!first||!id||!otherId)throw new Error('Test setup incomplete');
   const roles=await first.from('user_roles').select('role').eq('user_id',id);expect(roles.data).toEqual([{role:'client'}]);
   const promotion=await first.rpc('manage_access',{target_user:id,wanted_role:'admin',branches:[]});expect(promotion.error?.message).toContain('Sem permissão');
   const privateRead=await first.from('profiles').select('id').eq('id',otherId);expect(privateRead.error).toBeNull();expect(privateRead.data).toEqual([]);
   const directRoleWrite=await first.from('user_roles').insert({user_id:id,role:'admin'});expect(directRoleWrite.error).not.toBeNull();
   const stockWrite=await first.from('store_product_settings').upsert({product_id:'combo-festa',branch_id:'jardins',stock_status:'ESGOTADO'});expect(stockWrite.error).not.toBeNull();
   const campaignWrite=await first.from('store_campaigns').insert({name:'Unauthorized campaign',start_date:'2026-12-01',end_date:'2026-12-25',active:true});expect(campaignWrite.error).not.toBeNull();
  }finally{for(const id of ids)await admin.auth.admin.deleteUser(id);}
 },30000);
});