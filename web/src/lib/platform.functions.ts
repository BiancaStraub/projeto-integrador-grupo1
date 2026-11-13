import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { registrationSchema } from './registration';

export const loadAccount = createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async ({context}) => {
  const [profile, roles, branches] = await Promise.all([
    context.supabase.from('profiles').select('*').eq('id',context.userId).single(),
    context.supabase.from('user_roles').select('role').eq('user_id',context.userId),
    context.supabase.rpc('public_branch_directory'),
  ]);
  if (profile.error) throw new Error(profile.error.message);
  if (roles.error) throw new Error(roles.error.message);
  if (branches.error) throw new Error(branches.error.message);
  return {profile:profile.data, roles:roles.data.map(r=>r.role), branches:branches.data};
});
const filterSchema = z.object({category:z.enum(['branch','person','business','owner']), search:z.string().max(100).default(''), status:z.enum(['all','active','inactive']).default('all'), branch:z.string().default(''), page:z.number().int().min(0).default(0),own:z.boolean().optional()});
export const listRegistrations = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(filterSchema).handler(async ({data,context}) => {
  let query = context.supabase.from('registrations').select('*',{count:'exact'}).eq('category',data.category).order('created_at',{ascending:false});
  if(data.own) query=query.eq('user_id',context.userId);
  const search=data.search.replace(/[^\p{L}\p{N}@. _-]/gu,'').trim();
  if (search) query=query.or(['name','document','email','code','trade_name'].map(field=>`${field}.ilike.%${search}%`).join(','));
  if (data.status!=='all') query=query.eq('active',data.status==='active');
  if (data.branch) query=query.eq('branch_id',data.branch);
  const {data:rows,error,count}=await query.range(data.page*10,data.page*10+9);
  if(error) throw new Error(error.message);
  return {rows:rows??[],count:count??0};
});
export const loadDashboard = createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async ({context}) => {
  const counts=await Promise.all(['branch','person','business','owner'].map(async category=>{
    const {count,error}=await context.supabase.from('registrations').select('id',{count:'exact',head:true}).eq('category',category);
    if(error) throw new Error(error.message); return {category,count:count??0};
  }));
  const {data:profiles,error}=await context.supabase.from('profiles').select('*').order('display_name').limit(1000);
  if(error) throw new Error(error.message);
  const {data:links,error:linksError}=await context.supabase.from('owner_relationships').select('*');
  if(linksError) throw new Error(linksError.message);
  const {data:access,error:accessError}=await context.supabase.from('branch_access').select('*');
  if(accessError) throw new Error(accessError.message);
  const {data:roleRows,error:roleError}=await context.supabase.from('user_roles').select('*');
  if(roleError) throw new Error(roleError.message);
  return {counts,profiles:profiles??[],links:links??[],access:access??[],roleRows:roleRows??[]};
});
export const saveRegistration = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({id:z.string().uuid().nullable(),payload:registrationSchema,links:z.array(z.string().uuid()).max(50).default([])})).handler(async ({data,context}) => {
  // The generated RPC type doesn't express nullable SQL arguments; null is passed through the scoped client.
  const {data:id,error}=await context.supabase.rpc('save_registration',{record_id:data.id as string,payload:data.payload,links:data.links});
  if(error) throw new Error(error.message); return id;
});
export const setRegistrationActive = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({id:z.string().uuid(),active:z.boolean()})).handler(async ({data,context})=>{
  const {error}=await context.supabase.rpc('set_registration_active',{record_id:data.id,enabled:data.active}); if(error) throw new Error(error.message);
});
export const manageAccess = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({user:z.string().uuid(),role:z.enum(['admin','agent','client','branch_manager']),branches:z.array(z.string().uuid()).max(50)})).handler(async ({data,context})=>{
  const {error}=await context.supabase.rpc('manage_access',{target_user:data.user,wanted_role:data.role,branches:data.branches}); if(error) throw new Error(error.message);
});
export const loadSupport = createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async ({context})=>{
  const {data:conversations,error}=await context.supabase.from('conversations').select('*').order('updated_at',{ascending:false}).limit(500);
  if(error) throw new Error(error.message);
  const {data:profiles,error:pe}=await context.supabase.from('profiles').select('*').limit(1000); if(pe) throw new Error(pe.message);
  const {data:reads,error:re}=await context.supabase.from('conversation_reads').select('*').eq('user_id',context.userId); if(re) throw new Error(re.message);
  return {conversations:conversations??[],profiles:profiles??[],reads:reads??[]};
});
export const loadMessages = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({id:z.string().uuid()})).handler(async ({data,context})=>{
  const messages = [];
  for(let offset=0;;offset+=500){
    const {data:batch,error}=await context.supabase.from('messages').select('*').eq('conversation_id',data.id).order('created_at',{ascending:true}).order('id').range(offset,offset+499);
    if(error) throw new Error(error.message);
    messages.push(...(batch??[]));
    if(!batch||batch.length<500) break;
  }
  const {data:reads,error:re}=await context.supabase.from('conversation_reads').select('*').eq('conversation_id',data.id); if(re) throw new Error(re.message);
  return {messages,reads:reads??[]};
});
export const supportAction = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({action:z.enum(['create','send','read','status','assign']),id:z.string().uuid().optional(),payload:z.object({subject:z.string().trim().min(1).max(160).optional(),branch_id:z.string().uuid().or(z.literal('')).optional(),body:z.string().trim().min(1).max(4000).optional(),status:z.enum(['open','in_progress','closed']).optional(),assigned_to:z.string().uuid().or(z.literal('')).optional()}).default({})})).handler(async ({data,context})=>{
  const {data:id,error}=await context.supabase.rpc('support_action',{action:data.action,...(data.id?{conversation:data.id}:{}),payload:data.payload}); if(error) throw new Error(error.message); return id;
});