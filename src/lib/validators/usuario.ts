import { z } from 'zod';

export const usuarioCreateSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  senha: z.string().min(6),
  telefone: z.string().optional(),
  endereco: z.string().optional()
});

export const usuarioLoginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
  manterLogado: z.boolean()
});