import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.json({ message: "Acesso autorizado!", user: decoded });
  } catch (error) {
    return NextResponse.json(
      { error: "Token inválido ou expirado" },
      { status: 403 }
    );
  }
}
