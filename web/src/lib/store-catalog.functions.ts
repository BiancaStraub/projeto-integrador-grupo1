import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import type { Database } from '@/integrations/supabase/types';
import { campaignSchema, type CatalogSettings } from './store-catalog';
import { products } from './bakery';

export const loadCatalogSettings = createServerFn({ method: 'GET' }).handler(async (): Promise<CatalogSettings> => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  const url = process.env['SUPABASE_URL'];
  if (!key || !url) throw new Error('Não foi possível consultar a disponibilidade.');
  const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => {
    const headers = new Headers(init?.headers);
    if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
    headers.set('apikey', key);
    return fetch(input, { ...init, headers });
  } } });
  const [campaigns, settings] = await Promise.all([client.from('store_campaigns').select('*'), client.from('store_product_settings').select('*')]);
  if (campaigns.error || settings.error) throw new Error('Não foi possível consultar a disponibilidade.');
  return { campaigns: campaigns.data ?? [], settings: (settings.data ?? []).map(s => ({ ...s, stock_status: s.stock_status as CatalogSettings['settings'][number]['stock_status'] })) };
});
export const saveProductSetting = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(z.object({ product_id: z.string().refine(id => products.some(p => p.id === id)), branch_id: z.enum(['jardins', 'pinheiros', 'moema']), stock_status: z.enum(['DISPONIVEL', 'ESGOTADO', 'EM_PRODUCAO']), campaign_id: z.string().uuid().nullable() })).handler(async ({ data, context }) => {
  const { error } = await context.supabase.from('store_product_settings').upsert(data, { onConflict: 'product_id,branch_id' });
  if (error) throw new Error('Não foi possível salvar. É necessário acesso de administrador.');
});
export const saveCampaign = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(campaignSchema).handler(async ({ data, context }) => {
  const { id, ...fields } = data;
  const { error } = await context.supabase.from('store_campaigns').upsert({ ...fields, ...(id ? { id } : {}) });
  if (error) throw new Error('Não foi possível salvar a campanha. É necessário acesso de administrador.');
});