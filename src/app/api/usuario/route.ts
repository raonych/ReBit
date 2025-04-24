import { NextResponse } from "next/server";
import { atualizaPerfil, exibePerfil } from "@/lib/services/usuarioService";
import { getUserIdFromToken } from "@/lib/auth";

export async function GET(request: Request){
    const userId = getUserIdFromToken(request);

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const perfil = await exibePerfil(userId);

    return NextResponse.json(perfil.data, { status: perfil.status })
}

export async function PUT(request: Request){
    const userId = getUserIdFromToken(request);
    const body = await request.json();

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const perfilAtualizado = await atualizaPerfil(body,userId);
    return NextResponse.json(perfilAtualizado.data, { status: perfilAtualizado.status })
}