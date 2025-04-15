import { NextResponse } from 'next/server';
import { ExibirUnicoProduto, AtualizarProduto} from "@/lib/services/produtoService";
import { getUserIdFromToken } from '@/lib/auth';

export async function GET(request: Request,{ params }: { params: { id: number } }) {

    const produto = await ExibirUnicoProduto(params.id);

    return NextResponse.json(produto.data, { status: produto.status })

};

export async function PUT(request: Request, {params}: {params: {id: number}}) {
    const userId = getUserIdFromToken(request);
    const body = await request.json();

    if (!userId) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }

    const produto = await AtualizarProduto(params.id, userId, body)

    return NextResponse.json(produto.data, { status: produto.status })
}