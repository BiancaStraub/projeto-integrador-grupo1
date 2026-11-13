import { queryOptions } from '@tanstack/react-query';
import { loadAccount,loadDashboard,listRegistrations,loadSupport,loadMessages } from './platform.functions';
export const accountQuery = () => queryOptions({queryKey:['account'],queryFn:()=>loadAccount()});
export const dashboardQuery = () => queryOptions({queryKey:['platform','dashboard'],queryFn:()=>loadDashboard()});
export const registrationQuery = (filter:Parameters<typeof listRegistrations>[0]['data']) => queryOptions({queryKey:['platform','registrations',filter],queryFn:()=>listRegistrations({data:filter})});
export const supportQuery = () => queryOptions({queryKey:['support'],queryFn:()=>loadSupport()});
export const messagesQuery = (id:string) => queryOptions({queryKey:['messages',id],queryFn:()=>loadMessages({data:{id}})});