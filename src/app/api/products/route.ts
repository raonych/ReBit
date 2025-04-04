import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { produtoCreateSchema } from '@/lib/validators/produto';
import {z} from 'zod';
export async function POST(request: Request) {
  try {
    // 1. Obter os dados do corpo da requisição
    const body = await request.json()

    // 1. valida os dados
    const validatedData = produtoCreateSchema.parse(body)

    // 3. Criar o produto no banco de dados
    const newProduct = await prisma.produto.create({
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

    // 4. Retornar o produto criado
    return NextResponse.json(newProduct, { status: 201 })

  } catch (error) {

    console.error("Erro ao criar produto:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Dados inválidos",
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar sua solicitação" },
      { status: 500 }
    )
  }
}