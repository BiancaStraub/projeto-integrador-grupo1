import { catalogConfig, type CakeConfig } from './bakery';

/** One photographed cake shown as a full "Monte seu bolo" screen. */
export type CakeMockup = {
  number: number;
  key: string;
  thumb: string;
  full: string;
  config: CakeConfig;
};

/** Catalog keys in the order their screens were produced (screen 01 → 19). */
const mockupKeys = [
  'heart-1-vanilla-1-2-ivory',
  'round-1-vanilla-0-ivory',
  'square-2-vanilla-2-naked',
  'heart-1-vanilla-1-chocolate',
  'round-2-vanilla-0-3-ivory',
  'square-1-vanilla-1-2-naked',
  'round-1-chocolate-1-chocolate',
  'heart-2-chocolate-3-naked',
  'square-1-chocolate-2-chocolate',
  'round-2-chocolate-0-3-ivory',
  'heart-1-chocolate-1-2-naked',
  'heart-2-velvet-0-naked',
  'square-1-velvet-2-ivory',
  'round-2-velvet-1-chocolate',
  'heart-1-velvet-0-3-naked',
  'square-2-velvet-1-2-ivory',
  'square-2-vanilla-3-chocolate',
  'round-1-velvet-1-naked',
  'heart-2-chocolate-0-chocolate',
];

export const cakeMockups: CakeMockup[] = mockupKeys.map((key, index) => {
  const file = String(index + 1).padStart(2, '0');
  return {
    number: index + 1,
    key,
    thumb: `/mockups/mockup-${file}-thumb.webp`,
    full: `/mockups/mockup-${file}-full.webp`,
    config: catalogConfig(key),
  };
});
