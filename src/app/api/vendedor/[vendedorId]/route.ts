import { NextResponse } from "next/server";
import { ExibeVendedor} from "@/lib/services/vendedorService";

export async function GET(request: Request, {params}:{params: {vendedorId: number}}){
    const {vendedorId} = await params;

    const perfilVendedor = await ExibeVendedor(+vendedorId);

    return NextResponse.json(perfilVendedor.data, {status: perfilVendedor.status})
}

