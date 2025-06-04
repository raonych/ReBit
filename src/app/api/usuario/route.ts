import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/auth";
import { exibePerfil, atualizarPerfil } from "@/lib/services/usuarioService";

export async function GET(req: Request) {
    const userId = getUserIdFromToken(req);

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const resultado = await exibePerfil(userId);

    return NextResponse.json(resultado.data, { status: resultado.status })
}

export async function PUT(req: Request) {
    const userId = getUserIdFromToken(req);

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const resultado = await atualizarPerfil(userId, body);

    return NextResponse.json(resultado.data, { status: resultado.status })
}