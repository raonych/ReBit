import { prisma } from '@/lib/prisma';
import { ZodError } from "zod";
import { produtoCreateSchema } from '@/lib/validators/produto';

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
            take: 6
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