CREATE TABLE public.store_campaigns (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL CHECK (length(trim(name)) BETWEEN 1 AND 100),
 start_date date NOT NULL,
 end_date date NOT NULL,
 active boolean NOT NULL DEFAULT false,
 CHECK (end_date >= start_date)
);
GRANT SELECT ON public.store_campaigns TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.store_campaigns TO authenticated;
GRANT ALL ON public.store_campaigns TO service_role;
ALTER TABLE public.store_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY campaign_public_read ON public.store_campaigns FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY campaign_admin_write ON public.store_campaigns FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TABLE public.store_product_settings (
 product_id text PRIMARY KEY CHECK (length(product_id) BETWEEN 1 AND 100),
 stock_status text NOT NULL DEFAULT 'DISPONIVEL' CHECK (stock_status IN ('DISPONIVEL','ESGOTADO','EM_PRODUCAO')),
 campaign_id uuid REFERENCES public.store_campaigns(id) ON DELETE SET NULL
);
GRANT SELECT ON public.store_product_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.store_product_settings TO authenticated;
GRANT ALL ON public.store_product_settings TO service_role;
ALTER TABLE public.store_product_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY settings_public_read ON public.store_product_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY settings_admin_write ON public.store_product_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));