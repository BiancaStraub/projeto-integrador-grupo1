import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Cherry, ChevronDown, Circle, Flower2, Heart, Layers3, RotateCcw, ShoppingBag, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { CakePreview, cakePreviewImage, cakeCatalogImage, cakeDimensions } from '@/components/cake-preview';
import { useBakery } from '@/components/bakery-store';
import { cakePrice, cakeSizes, cakeFrostings, cakeFrostingName, supportsRoseFrosting, supportsFrosting, effectiveFrosting, money, pageHead, catalogCakes, catalogConfig, toggleFilling, type CakeConfig } from '@/lib/bakery';
import { toast } from 'sonner';
import { useRequireSignIn } from '@/components/use-signed-in';

export const Route = createFileRoute('/montar-bolo')({ head: () => pageHead('Monte seu bolo', 'Crie seu bolo Maison: escolha formato, andares, massa, recheios, cobertura, flores e frutas em um ateliê de sabores.'), component: CakeBuilder });
const showcase: CakeConfig = { shape: 'Coração', size: 20, dough: 'Red Velvet', fillings: ['Doce de Leite', 'Morango'], note: '', tiers: 2, edibleFlowers: true, redBerries: true, frosting: 'ivory' };

function CakeBuilder() {
  const [config, setConfig] = useState<CakeConfig>(showcase);
  const store = useBakery(); const { require: requireSignIn } = useRequireSignIn();
  const set = <K extends keyof CakeConfig>(key: K, value: CakeConfig[K]) => setConfig(c => {
    const next = { ...c, [key]: value };
    return next.frosting && !supportsFrosting(next, next.frosting) ? { ...next, frosting: 'ivory' } : next;
  });
  const fill = (flavor: string) => {
    if (!config.fillings.includes(flavor) && config.fillings.length === 2) toast.error('Escolha até 2 recheios. Remova um para trocar.');
    set('fillings', toggleFilling(config.fillings, flavor));
  };
  const addCake = () => {
    if (!requireSignIn()) return;
    store.add({ id: `cake-${Date.now()}`, name: 'Bolo personalizado', description: `${config.tiers} ${config.tiers === 2 ? 'andares' : 'andar'} · ${config.shape} · ${cakeDimensions(config)} · ${config.dough} · ${config.fillings.join(' + ')} · Cobertura ${cakeFrostingName(config)}${config.edibleFlowers ? ' · Flores' : ''}${config.redBerries ? ' · Frutas vermelhas' : ''}`, image: cakePreviewImage(config), price: cakePrice(config), cake: config });
    toast.success('Seu bolo foi adicionado ao carrinho!');
  };
  return <main className="cake-builder reveal">
    <div className="page-width builder-intro">
      <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground"><ArrowLeft size={13}/>Nossa vitrine</Link>
      <div className="builder-title"><div><p className="eyebrow text-primary mb-2">Seu momento. Seu bolo.</p><h1>Monte seu bolo<span className="text-primary">.</span></h1><p className="text-sm text-muted-foreground mt-2">Camadas de carinho, do seu jeito.</p></div></div>
    </div>
    <div className="page-width builder-layout">
      <div className="builder-controls">
        <div className="builder-controls-heading"><h2>Os detalhes fazem a diferença</h2><Button variant="ghost" size="icon" aria-label="Restaurar escolhas" title="Restaurar escolhas" onClick={() => setConfig(showcase)}><RotateCcw size={16}/></Button></div>
        <section className="builder-section"><h3>Andares</h3><div className="pill-row">{([1, 2] as const).map(tier => <button key={tier} type="button" className="pill" aria-pressed={config.tiers === tier} onClick={() => set('tiers', tier)}>{tier} {tier === 1 ? 'andar' : 'andares'}</button>)}</div></section>
        <section className="builder-section"><h3>Massa <small>Red Velvet + R$ 15</small></h3><div className="pill-row">{['Baunilha', 'Chocolate', 'Red Velvet'].map(dough => <button key={dough} type="button" className="pill" aria-pressed={config.dough === dough} onClick={() => set('dough', dough)}>{dough}</button>)}</div></section>
        <section className="builder-section"><h3>Recheio <small>{config.fillings.length}/2 · + R$ 10 por sabor</small></h3><div className="pill-row">{['Brigadeiro', 'Doce de Leite', 'Creme de Baunilha', 'Morango'].map(flavor => <button key={flavor} type="button" className="pill" aria-pressed={config.fillings.includes(flavor)} onClick={() => fill(flavor)}>{flavor}</button>)}</div></section>
        <section className="builder-section"><h3>Formato <small>Coração + R$ 20</small></h3><div className="pill-row">{['Redondo', 'Quadrado', 'Coração'].map(shape => <button key={shape} type="button" className="pill" aria-pressed={config.shape === shape} onClick={() => set('shape', shape)}>{shape}</button>)}</div></section>
        <section className="builder-section"><h3>Cobertura</h3><div className="pill-row">{cakeFrostings.map(option => <button key={option.id} type="button" className="pill" aria-pressed={effectiveFrosting(config) === option.id} disabled={!supportsFrosting(config, option.id)} title={!supportsFrosting(config, option.id) ? 'Ainda não fotografada para esta combinação.' : option.name} onClick={() => set('frosting', option.id)}>{option.id === 'naked' ? 'Sem Cobertura (Naked)' : option.name}</button>)}</div></section>
        <section className="builder-section"><h3>Tamanho <small>{cakeSizes.find(s => s.size === config.size)?.slices} fatias</small></h3><div className="pill-row">{([15, 20, 25] as const).map(size => <button key={size} type="button" className="pill" aria-pressed={config.size === size} onClick={() => set('size', size)}>{config.shape === 'Redondo' ? `Ø ${size} cm` : `${size} × ${size} cm`}</button>)}</div></section>
        <section className="builder-section"><h3>Decoração</h3><div className="pill-row">{([{key:'redBerries',name:'Frutas Vermelhas'},{key:'edibleFlowers',name:'Flores'}] as const).map(o => <button key={o.key} type="button" className="pill" aria-pressed={Boolean(config[o.key])} onClick={() => set(o.key, !config[o.key])}>{o.name}</button>)}</div></section>
        <details className="builder-more"><summary>Uma mensagem especial <ChevronDown size={14}/></summary><label htmlFor="cake-note" className="block text-xs mt-4 mb-2">Mensagem ou observação</label><textarea id="cake-note" className="form-field min-h-20" maxLength={300} value={config.note} onChange={e => set('note', e.target.value)} placeholder="Uma mensagem para um dia especial…"/></details>
        <div className="builder-checkout"><div className="flex justify-between items-center"><div><p className="text-xs text-muted-foreground">Seu bolo personalizado</p><p className="text-[10px] text-muted-foreground mt-1">Feito sob encomenda</p></div><span className="text-2xl font-semibold text-primary" aria-live="polite">{money(cakePrice(config))}</span></div><Button variant="bakery" className="w-full h-12 mt-4" disabled={!config.fillings.length} onClick={addCake}><ShoppingBag size={17}/>Adicionar ao carrinho<ArrowRight size={16}/></Button>{!config.fillings.length && <p className="text-[10px] text-muted-foreground text-center mt-3">Escolha pelo menos um recheio para continuar.</p>}</div>
      </div>
      <aside className="builder-preview"><CakePreview config={config}/></aside>
    </div>
    <section className="page-width mt-12 mb-16" aria-labelledby="catalogo-bolos"><h2 id="catalogo-bolos" className="text-2xl font-semibold mb-1">Nosso catálogo de bolos</h2><p className="text-sm text-muted-foreground mb-6">Toque em um bolo para montá-lo acima.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">{catalogCakes.map(key => { const c = catalogConfig(key); return <button key={key} type="button" className="rounded-2xl border border-border bg-card p-3 text-left transition hover:border-primary" onClick={() => { setConfig(c); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><img src={cakeCatalogImage(key)} alt={`Bolo ${c.shape}, ${c.dough}, ${c.fillings.join(' e ')}`} loading="lazy" className="w-full aspect-square object-contain"/><span className="block text-xs font-medium mt-2">{c.tiers} {c.tiers===2?'andares':'andar'} · {c.shape}</span><span className="block text-[11px] text-muted-foreground">{c.dough} · {c.fillings.join(' + ')} · {cakeFrostings.find(f=>f.id===c.frosting)?.name}</span></button>; })}</div>
    </section>
  </main>;
}
