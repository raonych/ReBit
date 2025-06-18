import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/auth";
import { atualizarEndereco } from "@/lib/services/enderecoService";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const enderecoId = parseInt(params.id);

  if (isNaN(enderecoId)) {
    return NextResponse.json({ error: "ID do endereço inválido" }, { status: 400 });
  }

  const resultado = await atualizarEndereco(enderecoId, userId, body);

  return NextResponse.json(resultado.data, { status: resultado.status });
} 