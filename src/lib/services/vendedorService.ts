import { prisma } from '@/lib/prisma';

export async function ExibeVendedor(vendedorId: number){
    try{
        const vendedor = await prisma.usuario.findUnique({
            where:{id: vendedorId},
            select:{
                nome:true,
                criadoEm: true,
                telefone:true,
                fotoPerfil: true,
            enderecos:{
                take:1,
                select:{
                    cidade:true,
                    UF:true,
                    bairro:true
                }
            },
            avaliacoesRecebidas: {
                take: 3,
                orderBy: { criadoEm: "desc" },
                select: {
                  id: true,
                  nota: true,
                  comentario: true,
                  criadoEm: true,
                  avaliador: { select: { nome: true } }
                }           
            }
        }})

        if(!vendedor){
            return{status:404, data: {message: "Vendedor não encontrado!"}}
        }

        const media = await prisma.avaliacao.aggregate({
            where: { avaliadoId: vendedorId },
            _avg: { nota: true }
          });

        return{status:200, data:{
            ...vendedor,
            notaVendedor: media._avg.nota ?? 0
        }}

    }catch(error){
        console.error("Erro ao retornar perfil do vendedor:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}   

export async function ExibeProdutosVendedor(vendedorId: number){
    try{
        const produtos = await prisma.produto.findMany({
            where:{AND: [
                { vendedorId: vendedorId },
                { compra: null }
            ]},
            select:{
                id: true,
                preco: true,
                nome: true,
                condicao: true,
                fotos:{
                    take: 1
                },
                criadoEm: true,
                vendedor:{
                    select:{
                        enderecos:{
                            take:1,
                            select:{
                                cidade:true,
                                UF:true
                            }
                        }
                    }
                },
            }
        })

        if(produtos.length === 0){
            return{status:200, data:{message: "Vendedor ainda não anunciou nenhum produto."}}
        }

        return{status:200, data:{produtos}}



    }catch(error){
        console.error("Erro ao retornar produtos do vendedor:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function exibeVendasUsuario(userId: number){
    try{
        const compras = await prisma.compra.findMany({
            where:{
                produto:{
                    vendedorId: userId
                }
            },
            include:{
                produto:{
                    select: {
                        nome: true
                    }
                }
            }
        })
        if(compras.length === 0){
            return{status:200, data:{message:"usuário ainda não realizou nenhuma venda"}}
        }

        return{status:200, data:compras}

    }catch(error){
        console.error("Erro ao exibir vendas:", error);
        return { status: 500, data: { error: "Erro interno do servidor", success:false } };
    }
}