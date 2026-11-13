import { queryOptions } from '@tanstack/react-query';
import { loadCatalogSettings } from './store-catalog.functions';
export const catalogSettingsQuery = () => queryOptions({ queryKey: ['store-catalog'], queryFn: () => loadCatalogSettings(), refetchInterval: 30000 });