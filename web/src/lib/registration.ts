import { z } from 'zod';

export const categories = { branch: 'Filiais', person: 'Pessoas físicas', business: 'Empresas', owner: 'Proprietários' } as const;
export type Category = keyof typeof categories;
export const roles = { admin: 'Administrador', agent: 'Atendente', client: 'Cliente', branch_manager: 'Responsável por filial' } as const;
export const conversationStatuses = { open: 'Aberta', in_progress: 'Em atendimento', closed: 'Encerrada' } as const;
export function validDocument(value: string, kind: 'cpf' | 'cnpj') {
  const d = value.replace(/\D/g, '');
  const n = kind === 'cpf' ? 11 : 14;
  if (d.length !== n || /^(\d)\1+$/.test(d)) return false;
  for (let check = 1; check <= 2; check++) {
    const weights = kind === 'cpf' ? Array.from({ length: 8 + check }, (_, i) => 9 + check - i) : check === 1 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
    let sum = weights.reduce((s, w, i) => s + Number(d[i]) * w, 0);
    if (kind === 'cpf') { sum = sum * 10 % 11; if (sum === 10) sum = 0; }
    else { sum %= 11; sum = sum < 2 ? 0 : 11 - sum; }
    if (sum !== Number(d[n - 3 + check])) return false;
  }
  return true;
}
const optional = (max: number) => z.string().max(max).default('');
const phone = z.string().refine(v => /^\d{10,13}$/.test(v.replace(/\D/g, '')), 'Informe um telefone válido com DDD.');
export const registrationSchema = z.object({
  category: z.enum(['branch','person','business','owner']), name: z.string().trim().min(2, 'Informe o nome.').max(160),
  document: optional(20), email: z.string().trim().email('E-mail inválido.').max(254), phone,
  whatsapp: optional(24).refine(v => !v || /^\d{10,13}$/.test(v.replace(/\D/g, '')), 'WhatsApp inválido.'),
  address: optional(600), code: optional(60), trade_name: optional(160), state_registration: optional(60),
  contact_name: optional(160), birth_date: optional(10), job_title: optional(120), branch_id: optional(36), user_id: optional(36),
}).superRefine((r, ctx) => {
  if ((r.category === 'person' || r.category === 'owner') && !validDocument(r.document,'cpf')) ctx.addIssue({code:'custom',path:['document'],message:'CPF inválido.'});
  if ((r.category === 'business' || (r.category === 'branch' && r.document)) && !validDocument(r.document,'cnpj')) ctx.addIssue({code:'custom',path:['document'],message:'CNPJ inválido.'});
  if (r.category !== 'owner' && r.address.trim().length < 8) ctx.addIssue({code:'custom',path:['address'],message:'Informe o endereço completo.'});
  if (r.category === 'branch' && !r.code.trim()) ctx.addIssue({code:'custom',path:['code'],message:'Informe o código.'});
  if (['branch','business'].includes(r.category) && r.contact_name.trim().length < 2) ctx.addIssue({code:'custom',path:['contact_name'],message:'Informe o responsável.'});
  if (r.birth_date && (!/^\d{4}-\d{2}-\d{2}$/.test(r.birth_date) || new Date(r.birth_date) > new Date())) ctx.addIssue({code:'custom',path:['birth_date'],message:'Data de nascimento inválida.'});
});
export type RegistrationInput = z.input<typeof registrationSchema>;
export const blankRegistration = (category: Category): RegistrationInput => ({ category, name:'', document:'', email:'', phone:'', whatsapp:'', address:'', code:'', trade_name:'', state_registration:'', contact_name:'', birth_date:'', job_title:'', branch_id:'', user_id:'' });
export function errorMessage(error: unknown) {
  const text = error instanceof Error ? error.message : typeof error === 'object' && error && 'message' in error ? String(error.message) : 'Não foi possível concluir. Tente novamente.';
  if (text.includes('duplicate key')) return 'Já existe um cadastro com este documento ou código.';
  return text;
}