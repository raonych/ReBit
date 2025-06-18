import { NextResponse } from 'next/server';
import { ExibirUnicoProduto, AtualizarProduto, DeleteProduto} from "@/lib/services/produtoService";
import { getUserIdFromToken } from '@/lib/auth';

export async function GET(request: Request,{ params }: { params: { id: number } }) {
    const {id} = await params;
    const userId = getUserIdFromToken(request)
    const produto = await ExibirUnicoProduto(+id, userId);

    return NextResponse.json(produto.data, { status: produto.status })

};

export async function PUT(request: Request, {params}: {params: {id: number}}) {
    const userId = getUserIdFromToken(request);
    const body = await request.json();
    const {id} = await params;

    if (!userId) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }

    const produto = await AtualizarProduto(+id, userId, body)

    return NextResponse.json(produto.data, { status: produto.status })
}

export async function DELETE(request: Request, {params}: {params: {id: string}}){
    const userId = getUserIdFromToken(request);
    const {id} = await params;

    if (!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const intId = parseInt(id);
    const res = await DeleteProduto(intId, userId);
    return NextResponse.json(res.data, { status: res.status })    
}