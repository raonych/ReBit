import { z } from 'zod';

export const produtoCreateSchema = z.object({
  nome: z.string().min(3),
  descricao: z.string(),
  categoriaId: z.string().transform((val) => parseInt(val, 10)),
  preco: z.string().transform((val) => parseFloat(val)),
  condicao: z.enum(["novo", "usado", "danificado"]),
  vendedorId: z.string().transform((val) => parseInt(val, 10)),
  imagemUrl: z.string().optional()
});
