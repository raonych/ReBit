import { NextResponse } from 'next/server';
import { ProdutosComFiltro } from "@/lib/services/produtoService";



export async function GET(request: Request){
    const {searchParams} = new URL(request.url);

    const produtos = await ProdutosComFiltro(searchParams);

    return NextResponse.json(produtos.data, {status:produtos.status})
}