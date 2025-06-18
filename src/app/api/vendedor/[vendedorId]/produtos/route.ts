import { NextResponse } from "next/server";
import { ExibeProdutosVendedor} from "@/lib/services/vendedorService";

export async function GET(request: Request, {params}:{params: {vendedorId: number}}){
    const {vendedorId} = await params;

    const produtosVendedor = await ExibeProdutosVendedor(+vendedorId);

    return NextResponse.json(produtosVendedor.data, {status: produtosVendedor.status})
}

