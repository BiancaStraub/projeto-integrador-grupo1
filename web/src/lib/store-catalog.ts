import { z } from 'zod';
export const stockStatuses = { DISPONIVEL: 'Disponível', ESGOTADO: 'Esgotado', EM_PRODUCAO: 'Em produção' } as const;
export type StockStatus = keyof typeof stockStatuses;
export type Preparation = 'fried' | 'frozen';
export const preparations = { fried: 'Frito pela loja', frozen: 'Congelado para fritar em casa' } as const;
export type Campaign = { id: string; name: string; start_date: string; end_date: string; active: boolean };
export type ProductSetting = { product_id: string; branch_id: string; stock_status: StockStatus; campaign_id: string | null };
export type CatalogSettings = { campaigns: Campaign[]; settings: ProductSetting[] };
export const emptyCatalog: CatalogSettings = { campaigns: [], settings: [] };
export const localDate = (date = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
export function productAvailability(id: string, branch: string, catalog: CatalogSettings, day: string) {
  const setting = catalog.settings.find(s => s.product_id === id && s.branch_id === branch);
  const campaign = setting?.campaign_id ? catalog.campaigns.find(c => c.id === setting.campaign_id) : undefined;
  const visible = !setting?.campaign_id || Boolean(campaign?.active && day >= campaign.start_date && day <= campaign.end_date);
  const status = setting?.stock_status ?? 'DISPONIVEL';
  return { visible, available: visible && status === 'DISPONIVEL', status, campaign };
}
export function cartBlocker(items: { id: string; productId?: string; requiresPreparation?: boolean; preparation?: Preparation }[], branch: string, catalog: CatalogSettings, day: string) {
  if (items.some(i => !productAvailability(i.productId ?? i.id, branch, catalog, day).available)) return 'Há itens indisponíveis na sua loja. Remova-os para continuar.';
  if (items.some(i => i.requiresPreparation && !i.preparation)) return 'Escolha o preparo de cada combo antes de finalizar.';
  return null;
}
export const campaignSchema = z.object({ id: z.string().uuid().optional(), name: z.string().trim().min(1).max(100), start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), active: z.boolean() }).refine(c => c.end_date >= c.start_date, { message: 'A data final deve ser igual ou posterior à inicial.' });