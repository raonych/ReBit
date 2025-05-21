import { NextResponse } from 'next/server';
import { CadastrarProduto, ExibirProdutosRecentes } from "@/lib/services/produtoService";
import { getUserIdFromToken } from '@/lib/auth';


export async function POST(request: Request) {

    const body = await request.json()

    const novoProduto = await CadastrarProduto(body);

    return NextResponse.json(novoProduto.data, { status: novoProduto.status })

};

export async function GET(request: Request) {
    const userId = getUserIdFromToken(request);
    const produtosRecentes = await ExibirProdutosRecentes(userId);
    return NextResponse.json(produtosRecentes.data, { status: produtosRecentes.status });
  }
