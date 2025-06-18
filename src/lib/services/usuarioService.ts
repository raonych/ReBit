import { prisma } from '@/lib/prisma';
import { usuarioUpdateSchema } from '../validators/usuario';
import { ZodError } from 'zod';

export async function exibePerfil(userId: number){
    try{
        const perfil = await prisma.usuario.findUnique({
            where:{id: userId},
            include:{
                enderecos:true
            }
        })
        if(!perfil){
            return{status: 404, data:{message:"usuário não encontrado"}}
        }

        const {senha:_, ...perfilSemSenha} = perfil;

        return{status:200, data:perfilSemSenha};

    }catch(error){
        console.error("Erro ao retornar perfil:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function atualizaPerfil(body: any, userId: number){
    try{
        const validatedData = usuarioUpdateSchema.parse(body);

        const perfil = await prisma.usuario.findUnique({
            where:{id: userId}
        })
        if(!perfil){
            return{status: 404, data:{message:"usuário não encontrado"}}
        }

        const perfilAtualizado = await prisma.usuario.update({
            where:{id: userId},
            data: validatedData
        })

        const {senha:_, ...perfilSemSenha} = perfilAtualizado;

        return{status:200, data:perfilSemSenha}

    }catch(error){
        console.error("Erro ao atualizar perfil:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function exibirMeusProdutos(userId: number){
    try{
        
        const meusProdutos = await prisma.produto.findMany({
            where:{
                vendedorId: userId,
                OR: [
                { compra: null },
                {
                  compra: {
                    status: { not: "aprovado" }
                  }
                }
              ]
            },
            include:{
                vendedor:{
                    select:{
                        enderecos:{
                            select:{
                                cidade:true
                            }
                        }
                    }
                },
                fotos:{
                    take:1
                }
            }
        })

        if(meusProdutos.length === 0){
            return{status:404,data:{message:"Você ainda não anunciou nenhum produto"}}
        }

        return{status:200,data:meusProdutos};

    }catch(error){
        console.error("Erro ao carregar seus produtos:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function atualizarFotoPerfil(userId: number, fotoUrl: string) {
  try {
    const usuario = await prisma.usuario.update({
      where: { id: userId },
      data: { fotoPerfil: fotoUrl }
    });

    const { senha: _, ...usuarioSemSenha } = usuario;
    return { status: 200, data: usuarioSemSenha };
  } catch (error) {
    console.error("Erro ao atualizar foto de perfil:", error);
    return { status: 500, data: { error: "Erro interno do servidor" } };
  }
}

export async function atualizarPerfil(userId: number, dados: any) {
  try {
    const dadosAtualizados = usuarioUpdateSchema.parse(dados);

    const usuario = await prisma.usuario.update({
      where: { id: userId },
      data: dadosAtualizados
    });

    const { senha: _, ...usuarioSemSenha } = usuario;
    return { status: 200, data: usuarioSemSenha };
  } catch (error) {
    if (error instanceof ZodError) {
      return { status: 400, data: { error: error.errors } };
    }

    console.error("Erro ao atualizar perfil:", error);
    return { status: 500, data: { error: "Erro interno do servidor" } };
  }
}