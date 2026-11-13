import {describe,it,expect} from 'vitest';
import {validDocument,registrationSchema,blankRegistration} from '@/lib/registration';
describe('Private registration rules',()=>{
 it('validates CPF check digits',()=>{expect(validDocument('529.982.247-25','cpf')).toBe(true);expect(validDocument('529.982.247-24','cpf')).toBe(false);});
 it('validates CNPJ check digits',()=>{expect(validDocument('04.252.011/0001-10','cnpj')).toBe(true);expect(validDocument('04.252.011/0001-11','cnpj')).toBe(false);});
 it('rejects repeated CPF digits',()=>{expect(validDocument('111.111.111-11','cpf')).toBe(false);});
 it('requires valid customer contact information',()=>{expect(registrationSchema.safeParse({...blankRegistration('person'),name:'Cliente teste',document:'52998224725',email:'invalid',phone:'123',address:'Rua de teste 100'}).success).toBe(false);});
 it('requires a branch identifier',()=>{expect(registrationSchema.safeParse({...blankRegistration('branch'),name:'Filial teste',email:'branch@example.test',phone:'11999999999',address:'Rua de teste 100',contact_name:'Responsável teste'}).success).toBe(false);});
 it('rejects a future birth date',()=>{expect(registrationSchema.safeParse({...blankRegistration('person'),name:'Cliente teste',document:'52998224725',email:'customer@example.test',phone:'11999999999',address:'Rua de teste 100',birth_date:'2999-01-01'}).success).toBe(false);});
});