import {prisma} from '@/lib/prisma';
import { compraCreateSchema, compraUpdateSchema } from '../validators/compra';

export async function iniciaCompra(body: any, userId:  number){
    try{
      const produtoPreco = await prisma.produto.findUnique({
            where:{
                id: parseInt(body.produtoId)
            },
            select:{
                preco:true
            }
        })
        
        if(!body.remetenteDoc || !body.remetenteNome){
            const comprador = await prisma.usuario.findUnique({
            where:{
                id: userId
            }
        });

        body.remetenteNome = comprador?.nome;
        body.remetenteDoc = comprador?.telefone;
        }
        

        if(!produtoPreco){
            return{status:404,data:{message:"produto não encontrado",success:false}}
        }

        const enderecoExistente = await prisma.endereco.findUnique({
        where: { id: parseInt(body.enderecoId)}
        });

        if (!enderecoExistente) {
        return{status:404,data:{message:"endereço não encontrado",success:false}}
        }

        const compra = await prisma.compra.create({
            data:{
                valor:produtoPreco.preco,
                metodoPagamento:body.metodoPagamento,
                compradorId: userId,
                status:"pendente",
                enderecoId: parseInt(body.enderecoId),
                produtoId: parseInt(body.produtoId),
                remetenteNome: body.remetenteNome,
                remetenteDoc: body.remetenteDoc

            }
        })

        return{status: 200, data:{compra, success:true}}

    }catch(error){
        console.error("Erro ao realizar compra:", error);
        return { status: 500, data: { error: "Erro interno do servidor", success:false } };
    }

}

export async function atualizaStatusCompra(body: any, userId: number){
    try{
        const validatedData = compraUpdateSchema.parse(body);

        const compra = await prisma.compra.findFirst({
            where:{
                id: validatedData.compraId,
                produto:{vendedorId: userId}
            }
        })

        if(!compra){
            return{status: 404, data:{message:"Nenhuma compra a ser aprovada"}}
        }

        if(validatedData.status == "falhou"){
            await prisma.compra.delete({
                where:{
                    id: validatedData.compraId
                }
            })

            return{status: 200, data:{success:true, data: {message: "compra deletada com sucesso"}}}
        }


        const  atualizaCompra = await prisma.compra.update({
            where:{
                id: validatedData.compraId
            },
            data:{
                status: validatedData.status
            }
        })

        return{status: 200, data:{success:true, atualizaCompra}}

    }catch(error){
        console.error("Erro ao aprovar compra:", error);
        return { status: 500, data: { error: "Erro interno do servidor", success:false } };
    }

}

export async function exibeComprasUsuario(userId: number){
    try{
        const compras = await prisma.compra.findMany({
            where:{compradorId:userId},
            include:{
                produto:{
                    select:{
                        nome: true,
                        condicao: true,
                        categoria: true,
                        vendedor:{
                            select:{
                                id:true,
                                nome:true,
                                telefone: true
                            }
                        }
                    }
                }
            }
        })
        if(compras.length === 0){
            return{status:200, data:{message:"usuário ainda não realizou nenhuma compra"}}
        }

        return{status:200, data:compras}

    }catch(error){
        console.error("Erro ao exibir compras:", error);
        return { status: 500, data: { error: "Erro interno do servidor", success:false } };
    }
}