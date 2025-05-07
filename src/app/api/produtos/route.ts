import { NextResponse } from 'next/server';
import { CadastrarProduto, ExibirTodosOsProdutos } from "@/lib/services/produtoService";


export async function POST(request: Request) {

    const body = await request.json()

    const novoProduto = await CadastrarProduto(body);

    return NextResponse.json(novoProduto.data, { status: novoProduto.status })

};

export async function GET() {

    const todosProdutos = await ExibirTodosOsProdutos();

    return NextResponse.json(todosProdutos.data, { status: todosProdutos.status })

};
