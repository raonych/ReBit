import { getUserIdFromToken } from "@/lib/auth";
import { exibirMeusProdutos } from "@/lib/services/usuarioService";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    const userId = getUserIdFromToken(request);

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const meusProdutos = await exibirMeusProdutos(userId);

    return NextResponse.json(meusProdutos.data, { status: meusProdutos.status })
}