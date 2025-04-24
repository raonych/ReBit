import { prisma } from '@/lib/prisma';
import { usuarioUpdateSchema } from '../validators/usuario';

export async function exibePerfil(userId: number){
    try{
        const perfil = await prisma.usuario.findUnique({
            where:{id: userId}
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