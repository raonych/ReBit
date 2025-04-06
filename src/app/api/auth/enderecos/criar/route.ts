// src/app/api/usuarios/endereco/route.ts

import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/auth";
import { cadastrarEndereco } from "@/lib/services/enderecoService";

export async function POST(req: Request) {
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const resultado = await cadastrarEndereco(userId, body);

  return NextResponse.json(resultado.data, { status: resultado.status });
}
