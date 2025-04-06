// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { usuarioService } from "@/lib/services/loginService";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { usuario, token } = await usuarioService.login(body);

    return NextResponse.json({ usuario, token }, { status: 200 });
  } catch (error) {
    console.error("Erro no login:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    if (
      error instanceof Error &&
      error.message === "Usuário ou senha inválidos"
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
