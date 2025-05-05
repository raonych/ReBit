import { NextResponse } from "next/server";
import {listarConversasVendedor } from "@/lib/services/conversaService";
import { getUserIdFromToken } from "@/lib/auth";

export async function GET(request: Request){
    const userId = getUserIdFromToken(request);     

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const conversa = await listarConversasVendedor(userId);

    return NextResponse.json(conversa.data, {status: conversa.status})

}