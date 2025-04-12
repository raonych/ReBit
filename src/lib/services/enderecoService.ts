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
