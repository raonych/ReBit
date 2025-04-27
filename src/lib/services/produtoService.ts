import { prisma } from '@/lib/prisma';
import { ZodError } from "zod";
import { produtoCreateSchema, produtoUpdateSchema, querySchema } from '@/lib/validators/produto';
import { Search } from 'lucide-react';
import { CondicaoProduto } from '@prisma/client';

export async function CadastrarProduto(body: any){
    try{

        const validatedData = produtoCreateSchema.parse(body)

        const novoProduto = await prisma.produto.create({
            data: {...validatedData}
        })

        return { status: 201, data: novoProduto };

    }catch (error) {

        console.error("Erro ao criar produto:", error)
    
        if (error instanceof ZodError) {
            return { status: 400, data: { error: error.errors } };
        }
        console.error("Erro ao cadastrar produto:", error);
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function ExibirProdutosRecentes(){
    try{

        const produtosRecentes = await prisma.produto.findMany({
            orderBy: {
              criadoEm: 'desc'
            },
            take: 6,
            include:{
              vendedor:{
                select:{
                  enderecos:{
                    select:{
                      cidade:true,
                      UF:true
                    }
                  }
                }
              },
              categoria:true
            }
          })  


          if (produtosRecentes.length === 0) {
            return { status: 200, data: { message: "Nenhum produto encontrado"} };
          }

          return { status: 200, data: produtosRecentes };
    }
    catch (error) {
        console.error("Erro ao retornar produtos:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function ExibirUnicoProduto(id: number){
    try{
        const produtoId = Number(id);
        const produto = await prisma.produto.findUnique({
            where: { id: produtoId },
            include: {
              vendedor: {
                select: {
                  nome: true,
                  telefone: true,
                  enderecos: {
                    select: {
                      rua: true,
                      numero: true,
                      bairro: true,
                      cidade: true,
                      UF: true,
                      cep: true,
                    },
                  },
                },
              },
              categoria: {
                select:{ nome: true }
              }
            },
          });

        return(
            produto?
            { status: 200, data: produto}
            :
            { status: 200, data: { message: "Nenhum produto encontrado"} }
        );

    }catch(error){
        console.error("Erro ao retornar produto:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function AtualizarProduto( id: number, userId: number, body: any){
    try{
        const produtoId = Number(id);
        const validatedData = produtoUpdateSchema.parse(body);
        
        const produto = await prisma.produto.findFirst({
            where: {
            id: produtoId,
            vendedorId: userId,
            },
        });

        if (!produto) {
            return { status: 404, data: { error: "Produto não encontrado ou você não tem permissão" } };
          }

          const attProduto = await prisma.produto.update({
            where: {
              id: produtoId,
            },
            data: validatedData,
          });

        const produtoAtualizado = await prisma.produto.findUnique({
            where: { id: produtoId },
          });

        return { status: 200, data: produtoAtualizado };


    }
    catch(error){
        console.error("Erro ao atualizar produtos:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    } 
}

export async function DeleteProduto(id: number,userId: number){
    try{ 
        const produto = await prisma.produto.findFirst({
            where: {
            id: +id,
            vendedorId: userId,
            },
        });

        if (!produto) {
            return { status: 404, data: { error: "Produto não encontrado ou você não tem permissão" } };
          }

          const deleteProduto = await prisma.produto.delete({
            where: {
              id: +id
            }
          });

        return { status: 200, data: {message:"Produto deletado com sucesso!"} };


    }
    catch(error){
        console.error("Erro ao atualizar produtos:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    } 
}  

export async function pesquisaProduto(searchParams: any){
  try {

    const validatedData = querySchema.safeParse(Object.fromEntries(searchParams));

    if (!validatedData.success) {
    return { status: 400, data: { error: 'Parâmetros inválidos' } };
  }

    const { categoria, busca, condicao} = validatedData.data;

    const produtos = await prisma.produto.findMany({
      where: {
        AND: [
          categoria
            ? {
                categoria: {
                  nome: {
                    equals: categoria
                  },
                },
              }
            : {},
          busca
            ? {
                OR: [
                  {
                    nome: {
                      contains: busca
                    },
                  },
                  {
                    descricao: {
                      contains: busca
                    },
                  },
                ],
              }
            : {},
            condicao
            ? {
              condicao: {
                equals: condicao 
              }
            } : {}
        ],
      },
      include: {
        vendedor: {
          select: {
            nome: true,
            enderecos: true,
          },
        },
        categoria: true,
      }
    });

    if(produtos.length === 0){
      return { status: 404, data: { message: "Nenhum produto encontrado" } };
    }

    return { status: 200, data: {success:true, produtos} };

  }catch(error){
    console.error("Erro ao retornar produtos:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
  }
}