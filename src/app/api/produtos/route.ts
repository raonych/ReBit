import { NextResponse } from 'next/server';
import { CadastrarProduto, ExibirProdutosRecentes } from "@/lib/services/produtoService";


export async function POST(request: Request) {

    const body = await request.json()

    const novoProduto = await CadastrarProduto(body);

    return NextResponse.json(novoProduto.data, { status: novoProduto.status })

};

export async function GET() {
    const produtosRecentes = await ExibirProdutosRecentes();
    return NextResponse.json(produtosRecentes.data, { status: produtosRecentes.status });
  }
