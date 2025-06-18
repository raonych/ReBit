import {z} from 'zod';
export const AvaliacaoCreateSchema = z.object({
    avaliadoId: z.preprocess((val) => Number(val), z.number().int()),
    produtoId: z.preprocess((val) => Number(val), z.number().int()),
    nota: z.preprocess((val) => Number(val), z.number().positive().max(5)),
    comentario: z.string().optional(),
});