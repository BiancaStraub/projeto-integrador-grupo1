import { describe, expect, it } from 'vitest';
import { cakePrice, cakeSizes, defaultCake, toggleFilling } from '@/lib/bakery';
describe('Cake requirements',()=>{
 it('limits fillings to two flavors',()=>{ expect(toggleFilling(['Brigadeiro','Morango'],'Doce de Leite')).toEqual(['Brigadeiro','Morango']); });
 it('allows deselecting a filling and choosing a replacement',()=>{expect(toggleFilling(toggleFilling(['Brigadeiro','Morango'],'Morango'),'Doce de Leite')).toEqual(['Brigadeiro','Doce de Leite']);});
 it('serves ten slices at 15cm',()=>{expect(cakeSizes.find(s=>s.size===15)?.slices).toBe(10);});
 it('serves twenty slices at 20cm',()=>{expect(cakeSizes.find(s=>s.size===20)?.slices).toBe(20);});
 it('updates price for selected and removed fillings',()=>{expect(cakePrice({...defaultCake,fillings:['Brigadeiro','Morango']})-cakePrice({...defaultCake,fillings:['Brigadeiro']})).toBe(10);});
});