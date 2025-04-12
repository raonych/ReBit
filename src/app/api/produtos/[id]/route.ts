import { NextResponse } from 'next/server';
import { ExibirUnicoProduto } from "@/lib/services/produtoService";

export async function GET(request: Request,{ params }: { params: { id: number } }) {

    const produto = await ExibirUnicoProduto(params.id);

    return NextResponse.json(produto.data, { status: produto.status })

};
