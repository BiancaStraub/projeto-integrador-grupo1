import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useAccount } from './account-provider';
import { useBakery } from './bakery-store';

/** Orders require a real account or a demo persona; otherwise send the visitor to sign in. */
export function useRequireSignIn() {
  const { user } = useAccount(); const store = useBakery(); const navigate = useNavigate();
  const signedIn = Boolean(user || store.demoAccount);
  const require = () => { if (signedIn) return true; toast.error('Você precisa estar logado',{description:'Entre na sua conta para fazer pedidos.'}); void navigate({ to: '/auth' }); return false; };
  return { signedIn, require };
}
