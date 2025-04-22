import { NextResponse } from "next/server";
import { iniciaCompra } from "@/lib/services/compraService";
import { getUserIdFromToken } from "@/lib/auth";

export async function POST(request: Request){
    const userId = getUserIdFromToken(request);
    const body = await request.json();  

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const compra = await iniciaCompra(body, userId);

    return NextResponse.json(compra.data, {status: compra.status})
}