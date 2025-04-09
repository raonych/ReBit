import { z } from 'zod';

export const produtoCreateSchema = z.object({
  nome: z.string().min(3),
  descricao: z.string(),
  categoriaId: z.preprocess((val) => Number(val), z.number().int()),
  preco: z.preprocess((val) => Number(val), z.number().positive()),
  condicao: z.enum(["novo", "usado", "danificado"]),
  vendedorId: z.preprocess((val) => Number(val), z.number().int()),
  imagemUrl: z.preprocess((val) => (val === null ? "" : val), z.string().optional())
});

