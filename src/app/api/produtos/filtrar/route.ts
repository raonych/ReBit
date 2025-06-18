import { NextResponse } from 'next/server';
import { ProdutosComFiltro } from "@/lib/services/produtoService";
import { getUserIdFromToken } from '@/lib/auth';



export async function GET(request: Request){
    const {searchParams} = new URL(request.url);
    const userId =getUserIdFromToken(request);
    const produtos = await ProdutosComFiltro(searchParams, userId);

    return NextResponse.json(produtos.data, {status:produtos.status})
}