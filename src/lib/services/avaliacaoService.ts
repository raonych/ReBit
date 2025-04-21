import { AvaliacaoCreateSchema } from "../validators/avaliacao";
import { prisma } from '@/lib/prisma';

export async function AvaliaProduto(body: any, userId: number){
    try{
        const validatedData = AvaliacaoCreateSchema.parse(body);

        const verificaCompra = await prisma.compra.findFirst({
            where: {
              compradorId: userId,
              status: "aprovado",
              produtoId:validatedData.produtoId
            }
          });

        if (!verificaCompra) {
           return { status: 400, data: {success: false, message: "Só é possivel avaliar produtos comprados!" }};
        }

        const {produtoId:_ ,...avaliacao} = validatedData

        const avaliaProduto = await prisma.avaliacao.create({
            data:{
                avaliadorId: userId,
                ...avaliacao
            }
        })

        return {status:200, data:{success:true, message:"Avaliação enviada."} }
       

    }catch(error){
        console.error("Erro ao enviar avaliação:", error);
        return { status: 500, data: {success: false, error: "Erro interno do servidor" } };
    }
}

export async function exibeAvaliacoes(vendedorId: number){
    try{
        const avaliacoes = await prisma.avaliacao.findMany({
            where:{avaliadoId: vendedorId}
        })

        if(avaliacoes.length === 0){
            return{status:200,data:{message:"Nenhuma avaliação encontrada."}};
        }

        return{status:200,data:{avaliacoes}}
    }catch(error){
        console.error("Erro ao buscar avaliações:", error);
        return { status: 500, data: {success: false, error: "Erro interno do servidor" } };
    }
}