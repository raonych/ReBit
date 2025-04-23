import { prisma } from '@/lib/prisma';

import { createConversaSchema } from "../validators/conversa";

export async function iniciarConversa(body: any, userId: number){
    try{

        const validatedData = createConversaSchema.parse(body);
        const produto = await prisma.produto.findFirst({
            where:{id: validatedData.produtoId},
            select:{
                vendedorId:true
            }
        })

        if(!produto){
            return{status:404, data:{message:"Só é possivel iniciar conversas referentes a produtos"}}
        }

        const conversa = await prisma.conversa.create({
            data:{
                vendedorId: produto.vendedorId,
                compradorId: userId,
                produtoId: validatedData.produtoId

            }
        })

        const mensagem = await prisma.mensagem.create({
            data:{
                texto: validatedData.mensagem,
                remetenteId: userId,
                conversaId: conversa.id
            }
        })

        await prisma.conversa.update({
            where: { id: conversa.id },
            data: { ultimaMensagem: mensagem.texto }
          });

        return{status:200, data:{conversaId: conversa.id, mensagem}}

    }catch(error){
        console.error("Erro ao iniciar conversa:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function listarConversas(userId: number){
    try{
        const conversas = await prisma.conversa.findMany({
            where:{
                compradorId: userId
            }
        })

        if(conversas.length === 0){
            return{status:200, data:{message:"Nenhuma conversa a ser exibida"}}
        }
    }catch(error){
        console.error("Erro ao buscar conversas:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

