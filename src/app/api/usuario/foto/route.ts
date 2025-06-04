import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/auth";
import { atualizarFotoPerfil } from "@/lib/services/usuarioService";

export async function PUT(req: Request) {
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  
  if (!body.fotoUrl) {
    return NextResponse.json({ error: "URL da foto é obrigatória" }, { status: 400 });
  }

  const resultado = await atualizarFotoPerfil(userId, body.fotoUrl);

  return NextResponse.json(resultado.data, { status: resultado.status });
} 