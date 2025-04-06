import { z } from "zod";

export const enderecoSchema = z.object({
  rua: z.string().min(1, "A rua é obrigatória"),
  numero: z.string().min(1, "O número é obrigatório"),
  cidade: z.string().min(1, "A cidade é obrigatória"),
  UF: z.string().length(2, "A UF deve ter 2 letras").toUpperCase(),
  cep: z.string().min(8, "CEP inválido"),
});
