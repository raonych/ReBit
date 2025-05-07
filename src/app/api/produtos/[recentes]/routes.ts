import { NextResponse } from 'next/server';
import { ExibirProdutosRecentes } from "@/lib/services/produtoService";

export async function GET() {
  const produtosRecentes = await ExibirProdutosRecentes();
  return NextResponse.json(produtosRecentes.data, { status: produtosRecentes.status });
}