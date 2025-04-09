import { prisma } from '@/lib/prisma';
import { ZodError } from "zod";
import { produtoCreateSchema } from '@/lib/validators/produto';

export async function CadastrarProduto(body: any){
    try{

        const validatedData = produtoCreateSchema.parse(body)

        const novoProduto = await prisma.produto.create({
            data: {
            nome: validatedData.nome,
            descricao: validatedData.descricao,
            preco: validatedData.preco,
            categoria: { connect: { id: validatedData.categoriaId } }, //id da categoria 
            condicao: validatedData.condicao,
            vendedor: { connect: { id: validatedData.vendedorId } },//id do usuario que anunciou o produto
            imagemUrl: validatedData.imagemUrl ?? null
            }
        })

        return(novoProduto)

    }catch (error) {

        console.error("Erro ao criar produto:", error)
    
        if (error instanceof ZodError) {
          return(
                    error.errors.map(e => ({
                    field: e.path.join('.'),
                    message: e.message
              }))
          )
        }
    }
}
