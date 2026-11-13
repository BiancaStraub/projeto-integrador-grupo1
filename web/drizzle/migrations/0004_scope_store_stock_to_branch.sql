ALTER TABLE public.store_product_settings ADD COLUMN branch_id text NOT NULL DEFAULT 'jardins' CHECK (branch_id IN ('jardins','pinheiros','moema'));
ALTER TABLE public.store_product_settings DROP CONSTRAINT store_product_settings_pkey;
ALTER TABLE public.store_product_settings ADD PRIMARY KEY (product_id, branch_id);