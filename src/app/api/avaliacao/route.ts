import { NextResponse } from "next/server";
import { AvaliaProduto} from "@/lib/services/avaliacaoService";
import { getUserIdFromToken } from "@/lib/auth";

export async function POST(request: Request){
    
    const userId = getUserIdFromToken(request);

    if(!userId){
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const body = await request.json();


    const avaliacao = await AvaliaProduto(body, userId);

    return NextResponse.json(avaliacao.data, {status: avaliacao.status})
}
