import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CondicaoProduto } from '@prisma/client'

export async function POST(request: Request) {
  try {
    // 1. Obter os dados do corpo da requisição
    const body = await request.json()
    
    // 2. Validar os dados (validação básica)
    if (!body.nome || !body.descricao || !body.preco || !body.quantidade || !body.categoria || !body.condicao || !body.vendedorId) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser fornecidos" },
        { status: 400 }
      )
    }

    // 3. Verificar se a condição é válida
    if (!Object.values(CondicaoProduto).includes(body.condicao)) {
      return NextResponse.json(
        { error: "Condição do produto inválida" },
        { status: 400 }
      )
    }

    // 4. Criar o produto no banco de dados
    const newProduct = await prisma.produto.create({
      data: {
        nome: body.nome,
        descricao: body.descricao,
        preco: parseFloat(body.preco),
        categoria: body.categoria,
        condicao: body.condicao,
        vendedorId: body.vendedorId,
        imagemUrl: body.imagem || null
      }
    })

    // 5. Retornar o produto criado
    return NextResponse.json(newProduct, { status: 201 })

  } catch (error) {
    console.error("Erro ao criar produto:", error)
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar sua solicitação" },
      { status: 500 }
    )
  }
}