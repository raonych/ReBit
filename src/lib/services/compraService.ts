import {prisma} from '@/lib/prisma';
import { compraCreateSchema } from '../validators/compra';

export async function iniciaCompra(body: any, userId:  number){
    try{
        const validatedData = compraCreateSchema.parse(body);

        const produtoPreco = await prisma.produto.findUnique({
            where:{
                id:validatedData.produtoId
            },
            select:{
                preco:true
            }
        })

        if(!produtoPreco){
            return{status:404,data:{message:"produto não encontrado",success:false}}
        }

        const compra = await prisma.compra.create({
            data:{
                valor:produtoPreco.preco,
                metodoPagamento:validatedData.metodoPagamento,
                compradorId: userId,
                status:"pendente",
                produtoId: validatedData.produtoId

            }
        })

        return{status: 200, data:{compra, success:true}}

    }catch(error){
        console.error("Erro ao realizar compra:", error);
        return { status: 500, data: { error: "Erro interno do servidor", success:false } };
    }

}