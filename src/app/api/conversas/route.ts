import { NextResponse } from "next/server";
import { iniciarConversa } from "@/lib/services/conversaService";
import { getUserIdFromToken } from "@/lib/auth";

export async function POST(request: Request){
    const userId = getUserIdFromToken(request);     

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();

    const conversa = await iniciarConversa(body, userId);

    return NextResponse.json(conversa.data, {status: conversa.status})
}