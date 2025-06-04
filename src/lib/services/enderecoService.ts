import { prisma } from "@/lib/prisma";
import { enderecoSchema } from "@/lib/validators/usuario";
import { ZodError } from "zod";

export async function cadastrarEndereco(userId: number, dados: any) {
  try {
    const enderecoData = enderecoSchema.parse(dados);

    const endereco = await prisma.endereco.create({
      data: {
        ...enderecoData,
        usuarioId: userId,
      },
    });

    return { status: 201, data: endereco };
  } catch (error) {
    if (error instanceof ZodError) {
      return { status: 400, data: { error: error.errors } };
    }

    console.error("Erro ao cadastrar endereço:", error);
    return { status: 500, data: { error: "Erro interno do servidor" } };
  }
}

export async function exibirEnderecos(userId: number){
  try{
    const enderecos = await prisma.endereco.findMany({
      where:{
        usuarioId: userId
      }
    }) 

    if(enderecos.length === 0){
      return {status: 404, data: {message:"Nenhum endereço cadastrado"}}
    }

    return {status: 200, data: enderecos};

  }catch(error){
    console.error("Erro ao exibir endereços", error);
    return {status: 500, data: {error : "Erro interno do servidor"}}
  }
}

export async function atualizarEndereco(enderecoId: number, userId: number, dados: any) {
  try {
    const enderecoData = enderecoSchema.parse(dados);

    const enderecoExistente = await prisma.endereco.findFirst({
      where: {
        id: enderecoId,
        usuarioId: userId
      }
    });

    if (!enderecoExistente) {
      return { status: 404, data: { error: "Endereço não encontrado ou não pertence ao usuário" } };
    }

    const endereco = await prisma.endereco.update({
      where: { id: enderecoId },
      data: {
        ...enderecoData,
        usuarioId: userId
      }
    });

    return { status: 200, data: endereco };
  } catch (error) {
    if (error instanceof ZodError) {
      return { status: 400, data: { error: error.errors } };
    }

    console.error("Erro ao atualizar endereço:", error);
    return { status: 500, data: { error: "Erro interno do servidor" } };
  }
}
