import { getUserIdFromToken } from "@/lib/auth";
import { exibeVendasUsuario } from "@/lib/services/vendedorService";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    const userId = getUserIdFromToken(request);

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const vendas = await exibeVendasUsuario(userId);
    
    return NextResponse.json(vendas.data, {status: vendas.status})
}
