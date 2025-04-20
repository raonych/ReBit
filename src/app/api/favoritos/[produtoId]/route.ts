import { NextResponse } from 'next/server';
import { favoritaProduto, desfavoritaProduto} from "@/lib/services/favoritosService";
import { getUserIdFromToken } from '@/lib/auth';

export async function POST(request: Request, {params}: {params: {produtoId: number}}){
    const userId = getUserIdFromToken(request);
    const {produtoId} = await params;

    if (!userId) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }

      console.log(produtoId);
    const produtoFavoritado = await favoritaProduto(+produtoId, userId);

    return NextResponse.json(produtoFavoritado.data, { status: produtoFavoritado.status })

}

export async function DELETE(request: Request, {params}: {params: {produtoId: number}}){
    const userId = getUserIdFromToken(request);
    const {produtoId} = await params;

    if (!userId) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }

      const produtoDesfavoritado = await desfavoritaProduto(+ produtoId, userId);

      return NextResponse.json(produtoDesfavoritado.data, { status: produtoDesfavoritado.status })
}
