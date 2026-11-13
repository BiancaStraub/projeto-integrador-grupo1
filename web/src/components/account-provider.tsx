import { createContext,useContext,useEffect,useState,type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
const AccountContext=createContext<{user:User|null;ready:boolean}>({user:null,ready:false});
export function AccountProvider({children}:{children:ReactNode}) {
  const [user,setUser]=useState<User|null>(null); const [ready,setReady]=useState(false); const client=useQueryClient(); const router=useRouter();
  useEffect(()=>{
    let alive=true;
    const {data:{subscription}}=supabase.auth.onAuthStateChange((event,session)=>{
      if(event==='INITIAL_SESSION'||event==='SIGNED_IN'||event==='SIGNED_OUT'||event==='USER_UPDATED') {
        if(alive){setUser(session?.user??null);setReady(true);}
        if(event==='SIGNED_OUT'){void client.cancelQueries();client.clear();}
        if(event==='SIGNED_IN'||event==='SIGNED_OUT'||event==='USER_UPDATED'){void router.invalidate();if(event!=='SIGNED_OUT')void client.invalidateQueries();}
      }
    });
    void supabase.auth.getUser().then(({data})=>{if(alive){setUser(data.user);setReady(true);}});
    return ()=>{alive=false;subscription.unsubscribe();};
  },[client,router]);
  return <AccountContext value={{user,ready}}>{children}</AccountContext>;
}
export const useAccount=()=>useContext(AccountContext);