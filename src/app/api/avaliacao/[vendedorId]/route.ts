import { NextResponse } from "next/server";
import {ExibeAvaliacoes } from "@/lib/services/avaliacaoService";

export async function GET(request: Request, {params}:{params: {vendedorId: number}}){
    
    const {vendedorId} = await params;

    const avaliacao = await ExibeAvaliacoes(vendedorId);

    return NextResponse.json(avaliacao.data, {status: avaliacao.status})
}
