import { NextResponse } from 'next/server';
import { CadastrarProduto } from "@/lib/services/produtoService";

export async function POST(request: Request) {

    const body = await request.json()

    const novoProduto = await CadastrarProduto(body);

    return NextResponse.json(novoProduto, { status: 201 })

};