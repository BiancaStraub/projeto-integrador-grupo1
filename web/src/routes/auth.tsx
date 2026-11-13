import {createFileRoute,Link,useNavigate} from '@tanstack/react-router';
import {useEffect,useState} from 'react';
import {Button} from '@/components/ui/button';
import {supabase} from '@/integrations/supabase/client';
import {lovable} from '@/integrations/lovable/index';
import '@lovable.dev/cloud-auth-js/styles.css';
import {useAccount} from '@/components/account-provider';
import {pageHead} from '@/lib/bakery';
import {errorMessage} from '@/lib/registration';
import {DemoLogin} from '@/components/demo-login';
import {useBakery} from '@/components/bakery-store';
import {authenticateDemo} from '@/lib/demo-accounts';
export const Route=createFileRoute('/auth')({head:()=>pageHead('Sua conta','Acesse sua conta Maison e acompanhe seus cadastros e atendimentos privados.'),component:Auth});
function Auth(){
 const [mode,setMode]=useState<'login'|'signup'|'reset'>('login');const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const {user}=useAccount();const navigate=useNavigate();const store=useBakery();
 useEffect(()=>{if(user)void navigate({to:'/conta'});},[user,navigate]);
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const form=new FormData(e.currentTarget);const email=String(form.get('email')).trim();const password=String(form.get('password')??'');setBusy(true);setMessage('');try{
  if(email.toLowerCase().endsWith('@demo.maison.test')){const demo=mode==='login'?authenticateDemo(email,password):null;if(!demo)throw new Error('Acesso de teste inválido. Use um dos perfis abaixo.');store.startDemo(demo.id);await navigate({to:'/testes'});return;}
  if(mode==='reset'){const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin+'/reset-password'});if(error)throw error;setMessage('Confira seu e-mail para redefinir a senha.');}
  else if(mode==='signup'){const {data,error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:window.location.origin+'/auth',data:{display_name:String(form.get('name')).trim()}}});if(error)throw error;if(!data.session)setMessage('Confira seu e-mail e confirme o cadastro antes de entrar.');}
  else{const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;await navigate({to:'/conta'});}
 }catch(err){setMessage(errorMessage(err));}finally{setBusy(false);}}
 async function social(provider:'google'|'lovable'){setBusy(true);const result=await lovable.auth.signInWithOAuth(provider,{redirect_uri:window.location.origin+'/auth'});if(result.error)setMessage(result.error.message);setBusy(false);}
 return <main className="account-auth page-width"><Link to="/" className="text-xs text-muted-foreground">← Nossa vitrine</Link><p className="eyebrow text-primary mt-8">Bem-vindo à Maison</p><h1 className="section-heading mt-3">{mode==='signup'?'Crie sua conta':mode==='reset'?'Recupere sua senha':'É bom ter você aqui.'}</h1><form method="post" onSubmit={submit} className="space-y-5 mt-8">{mode==='signup'&&<label className="field-label">Nome completo<input className="form-field" name="name" required minLength={2} maxLength={120} autoComplete="name"/></label>}<label className="field-label">E-mail<input className="form-field" name="email" type="email" required maxLength={254} autoComplete="email"/></label>{mode!=='reset'&&<label className="field-label">Senha<input className="form-field" name="password" type="password" required minLength={8} maxLength={128} autoComplete={mode==='signup'?'new-password':'current-password'}/></label>}<Button className="w-full h-12" variant="bakery" disabled={busy||!store.ready}>{busy?'Aguarde…':mode==='signup'?'Criar conta':mode==='reset'?'Enviar recuperação':'Entrar'}</Button>{message&&<p role="status" className="text-sm text-primary">{message}</p>}</form>{mode!=='reset'&&<div className="mt-5 space-y-3"><Button variant="outline" className="w-full h-11" disabled={busy} onClick={()=>social('google')}>Continuar com Google</Button><Button className="lovable-auth-button w-full" disabled={busy} onClick={()=>social('lovable')}>Continue with Lovable</Button></div>}<div className="flex flex-wrap gap-2 mt-5"><Button variant="link" onClick={()=>{setMode(mode==='signup'?'login':'signup');setMessage('');}}>{mode==='signup'?'Já tenho uma conta':'Criar uma conta'}</Button><Button variant="link" onClick={()=>{setMode(mode==='reset'?'login':'reset');setMessage('');}}>{mode==='reset'?'Voltar para entrar':'Esqueci minha senha'}</Button></div><DemoLogin/></main>;
}