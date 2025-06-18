import { NextResponse } from "next/server";
import { listarCategorias } from "@/lib/services/produtoService";

export async function GET(){
    const categorias = await listarCategorias();

    return NextResponse.json(categorias.data, { status: categorias.status })
}

