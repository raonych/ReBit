import { NextResponse } from "next/server";
import { atualizaStatusCompra, exibeComprasUsuario, iniciaCompra } from "@/lib/services/compraService";
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

export async function GET(request: Request){
    const userId = getUserIdFromToken(request);

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const compras = await exibeComprasUsuario(userId);
    
    return NextResponse.json(compras.data, {status: compras.status})
}

export async function PUT(request: Request){
    const userId = getUserIdFromToken(request);

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const body = await request.json();

    const attCompra = await atualizaStatusCompra(body, userId);

    return NextResponse.json(attCompra.data, {status: attCompra.status})
}
