import { prisma } from '@/lib/prisma';

import { createConversaSchema } from "../validators/conversa";

export async function iniciarConversa(body: any, userId: number) {
    try {
      const produtoId = parseInt(body.produtoId);
      if (isNaN(produtoId)) {
        console.log("ID do produto inválido.")
        return { status: 400, data: { message: "ID do produto inválido." } };
      }
  
      const produto = await prisma.produto.findFirst({
        where: { id: produtoId },
        select: { vendedorId: true }
      });
  
      if (!produto) {
        return {
          status: 404,
          data: { message: "Produto não encontrado para iniciar conversa" }
        };
      }
  
      const conversaExistente = await prisma.conversa.findFirst({
        where: {
          vendedorId: produto.vendedorId,
          compradorId: userId,
          produtoId: produtoId
        }
      });
  
      const conversa = conversaExistente || await prisma.conversa.create({
        data: {
          vendedorId: produto.vendedorId,
          compradorId: userId,
          produtoId: produtoId
        }
      });
  
      return { status: 200, data: { conversa } };
    } catch (error) {
      console.error("Erro ao iniciar conversa:", error);
      return { status: 500, data: { error: "Erro interno do servidor" } };
    }
  }

export async function listarConversas(userId: number){
    try{
        const conversas = await prisma.conversa.findMany({
            where: {
              OR: [
                { compradorId: userId },
                { produto: { vendedorId: userId } },
              ],
            },
            include: {
              produto: true, 
              vendedor:{
                select:{
                    nome:true
                }
              },
              comprador:{
                    select:{
                        nome:true
                    }
                }
            },
          });

        if(conversas.length === 0){
            return{status:404, data:{message:"Nenhuma conversa a ser exibida"}}
        }
        return{status:200, data:{conversas}}

    }catch(error){
        console.error("Erro ao buscar conversas:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function listarConversasVendedor(userId: number){
    try{
        const conversas = await prisma.conversa.findMany({
            where:{
                produto:{
                    vendedorId: userId
                }
            }
        })

        if(conversas.length === 0){
            return{status:404, data:{message:"Nenhuma conversa a ser exibida"}}
        }
        return{status:200, data:{conversas}}

    }catch(error){
        console.error("Erro ao buscar conversas:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function exibirConversa(conversaId: number){
    try{
        const conversa = await prisma.conversa.findUnique({
            where:{
                id: conversaId
            },
            include:{
                mensagens:true,
                comprador:{
                    select:{
                        nome:true
                    }
                },
                vendedor:{
                    select:{
                        nome:true
                    }
                },
                produto:{
                    select:{
                        nome:true
                    }
                }
            }
        })

        if(!conversa){
            return{status:404, data:{message:"Nenhuma conversa a ser exibida"}}
        }

        return{status:200, data:conversa}

    }catch(error){
        console.error("Erro ao buscar conversas:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function enviarMensgem(conversaId: number, texto: string , remetenteId: number){
    
    const attUltimaMsg = await prisma.conversa.update({
        where: {
          id: conversaId,
        },
        data:{
            ultimaMensagem: texto
        } 
      });

    const mensagem = await prisma.mensagem.create({
        data: {
          texto,
          remetenteId,
          conversaId,
        }
      });

      return mensagem

}