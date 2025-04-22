import { z } from 'zod';

export const compraCreateSchema = z.object({
  produtoId: z.preprocess((val) => Number(val), z.number().int()),
  metodoPagamento: z.enum(["cartao_debito", "cartao_credito", "pix"]),
});

