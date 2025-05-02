import { NextResponse } from "next/server";
import { exibirConversa} from "@/lib/services/conversaService";

export async function GET(request: Request, {params}: {params: {conversaId: number}}){
    const {conversaId} = await params;
    const conversa = await exibirConversa(+conversaId);

    return NextResponse.json(conversa.data, {status: conversa.status})
}