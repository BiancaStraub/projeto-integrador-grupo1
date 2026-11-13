import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { cakeMockups } from '@/lib/cake-mockups';
import { catalogCakes } from '@/lib/bakery';

describe('Monte seu bolo screen gallery', () => {
  it('shows all nineteen photographed cakes', () => {
    expect(cakeMockups.length).toBe(19);
  });
  it('points every screen at a photographed combination', () => {
    cakeMockups.forEach(mockup => expect(catalogCakes).toContain(mockup.key));
  });
  it('uses image files that exist on disk', () => {
    cakeMockups.forEach(mockup => {
      expect(existsSync(resolve('public', mockup.thumb.slice(1)))).toBe(true);
      expect(existsSync(resolve('public', mockup.full.slice(1)))).toBe(true);
    });
  });
  it('carries the choices the first screen shows', () => {
    const first = cakeMockups[0];
    if (!first) throw new Error('screen 01 is missing from the gallery');
    expect(first.config.shape).toBe('Coração');
    expect(first.config.tiers).toBe(1);
    expect(first.config.dough).toBe('Baunilha');
    expect(first.config.fillings).toEqual(['Brigadeiro', 'Doce de Leite']);
  });
});
