import { prisma } from '@/lib/prisma';
import { usuarioUpdateSchema } from '../validators/usuario';

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
                vendedorId: userId
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