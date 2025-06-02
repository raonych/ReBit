import { NextResponse } from "next/server";
import { iniciarConversa, listarConversas } from "@/lib/services/conversaService";
import { getUserIdFromToken } from "@/lib/auth";

export async function POST(request: Request){
    const userId = getUserIdFromToken(request);     

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const body = await request.json();
    console.log("aq", body)
    const conversa = await iniciarConversa(body, userId);

    return NextResponse.json(conversa.data, {status: conversa.status})
}

export async function GET(request: Request){
    const userId = getUserIdFromToken(request);     

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const conversa = await listarConversas(userId);

    return NextResponse.json(conversa.data, {status: conversa.status})

}