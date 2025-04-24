import { z } from 'zod';

export const createConversaSchema = z.object({
    produtoId: z.preprocess((val) => Number(val), z.number().int()),
    mensagem: z.string(),
})