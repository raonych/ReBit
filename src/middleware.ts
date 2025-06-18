import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const protectedPaths = ["/api/enderecos", "/api/produtos/criar"];

  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const jwt = require("jsonwebtoken");
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// aqui definimos quais caminhos a regra do middleware vai aplicar
export const config = {
  matcher: ["/api/enderecos"],
};
