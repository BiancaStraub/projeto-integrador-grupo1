import type { CakeConfig, CakeFrosting } from '@/lib/bakery';

/** Exact filenames of the 19 corrected cake photos (served from /public/bolos). */
export const cakeImageFiles = [
  'bolo-1-andar-coracao-baunilha-brigadeiro-chocolate',
  'bolo-1-andar-coracao-baunilha-brigadeiro-doce-de-leite-branca',
  'bolo-1-andar-coracao-chocolate-brigadeiro-doce-de-leite-naked',
  'bolo-1-andar-coracao-red-velvet-creme-de-baunilha-morango-naked',
  'bolo-1-andar-quadrado-baunilha-brigadeiro-doce-de-leite-naked',
  'bolo-1-andar-quadrado-chocolate-doce-de-leite-chocolate',
  'bolo-1-andar-quadrado-red-velvet-doce-de-leite-branca',
  'bolo-1-andar-redondo-baunilha-creme-de-baunilha-branca',
  'bolo-1-andar-redondo-chocolate-brigadeiro-chocolate',
  'bolo-1-andar-redondo-red-velvet-brigadeiro-naked',
  'bolo-2-andares-coracao-chocolate-creme-de-baunilha-chocolate',
  'bolo-2-andares-coracao-chocolate-morango-naked',
  'bolo-2-andares-coracao-red-velvet-creme-de-baunilha-naked',
  'bolo-2-andares-quadrado-baunilha-doce-de-leite-naked',
  'bolo-2-andares-quadrado-baunilha-morango-chocolate',
  'bolo-2-andares-quadrado-red-velvet-brigadeiro-doce-de-leite-branca',
  'bolo-2-andares-redondo-baunilha-morango-creme-de-baunilha-branca',
  'bolo-2-andares-redondo-chocolate-creme-de-baunilha-morango-branca',
  'bolo-2-andares-redondo-red-velvet-brigadeiro-chocolate',
] as const;

const slug = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '-');
const frostingSlug: Record<CakeFrosting, string> = { ivory: 'branca', chocolate: 'chocolate', naked: 'naked', rose: 'rosa' };

/** Order-insensitive lookup key: tiers|shape|dough|sorted fillings|frosting. */
const lookupKey = (tiers: number, shape: string, dough: string, fillings: string[], frosting: string) =>
  [tiers, shape, dough, [...fillings].sort().join('+'), frosting].join('|');

const fillingSlugs = ['creme-de-baunilha', 'doce-de-leite', 'brigadeiro', 'morango'];
const imageMap = new Map<string, string>();
const entries: { file: string; tiers: number; shape: string; dough: string; fillings: string[]; frosting: string }[] = [];
for (const file of cakeImageFiles) {
  const m = file.match(/^bolo-(\d)-andar(?:es)?-(coracao|quadrado|redondo)-(baunilha|chocolate|red-velvet)-(.+)-(branca|chocolate|naked)$/);
  if (!m) continue;
  let rest: string = m[4] ?? ''; const fillings: string[] = [];
  while (rest) { const r = rest; const f = fillingSlugs.find(s => r === s || r.startsWith(`${s}-`)); if (!f) break; fillings.push(f); rest = rest.slice(f.length + 1); }
  imageMap.set(lookupKey(Number(m[1]), m[2] ?? '', m[3] ?? '', fillings, m[5] ?? ''), file);
  entries.push({ file, tiers: Number(m[1]), shape: m[2] ?? '', dough: m[3] ?? '', fillings, frosting: m[5] ?? '' });
}

/** Returns the URL of the exact photo for the selected buttons, or null when none was photographed. */
export function getCakeImage(andares: number, massa: string, recheios: string[], formato: string, cobertura: CakeFrosting): string | null {
  const file = imageMap.get(lookupKey(andares, slug(formato), slug(massa), recheios.map(slug), frostingSlug[cobertura]));
  return file ? `/bolos/${file}.webp` : null;
}

export const cakeImageFor = (config: CakeConfig, frosting: CakeFrosting = config.frosting ?? 'ivory') =>
  decorateCakeImage(getCakeImage(config.tiers ?? 1, config.dough, config.fillings, config.shape, frosting), config);

/** Decorations select an edited whole-cake photograph, never an overlay. */
function decorateCakeImage(url: string | null, config: CakeConfig): string | null {
  if (!url) return null;
  const suffix = config.edibleFlowers ? (config.redBerries ? '' : '-flores') : (config.redBerries ? '-frutas' : '-lisa');
  return url.replace(/\.webp$/, `${suffix}.webp`);
}

/** Always returns one of the 19 photos: the exact match, or the closest one (shape > frosting > dough > tiers > fillings). */
export function closestCakeImage(config: CakeConfig): { url: string; exact: boolean } {
  const exact = cakeImageFor(config);
  if (exact) return { url: exact, exact: true };
  const shape = slug(config.shape), dough = slug(config.dough), fillings = config.fillings.map(slug);
  const frosting = frostingSlug[config.frosting ?? 'ivory'], tiers = config.tiers ?? 1;
  let best = entries[0], bestScore = -Infinity;
  if (!best) throw new Error('Cake photo catalog is empty');
  for (const e of entries) {
    const score = (e.dough === dough ? 6 : 0) + (e.tiers === tiers ? 5 : 0) + (e.shape === shape ? 4.5 : 0) + (e.frosting === frosting ? 4 : 0)
      + e.fillings.filter(f => fillings.includes(f)).length * 2 - e.fillings.filter(f => !fillings.includes(f)).length;
    if (score > bestScore) { best = e; bestScore = score; }
  }
  return { url: decorateCakeImage(`/bolos/${best.file}.webp`, config) ?? `/bolos/${best.file}.webp`, exact: false };
}

/** Warm the browser cache so switching options swaps the photo instantly. */
export function preloadCakeImages(config: CakeConfig) {
  if (typeof window === 'undefined') return;
  const base = closestCakeImage(config).url.replace(/-(frutas|flores|lisa)\.webp$/, '.webp');
  for (const suffix of ['', '-frutas', '-flores', '-lisa']) {
    const i = new Image(); i.decoding = 'async'; i.src = base.replace(/\.webp$/, `${suffix}.webp`);
  }
}
