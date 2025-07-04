import { z } from "zod";

export const usuarioSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
 telefone: z.string().regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, "Formato de telefone inválido"),
});

export const usuarioUpdateSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres").optional(),
  email: z.string().email("Email inválido").optional(),
  telefone: z.string().optional(),
});

export const usuarioLoginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
  manterLogado: z.boolean().optional(),
});

export const enderecoSchema = z.object({
  rua: z.string().min(1, "A rua é obrigatória"),
  numero: z.string().min(1, "O número é obrigatório"),
  bairro: z.string().min(1, "O bairro é obrigatório"),
  complemento: z.string().optional(),
  cidade: z.string().min(1, "A cidade é obrigatória"),
  UF: z.string().length(2, "A UF deve ter 2 letras").toUpperCase(),
  cep: z.string().min(8, "CEP inválido"),
});
