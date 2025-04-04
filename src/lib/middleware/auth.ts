import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Formato do token inválido" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.nextUrl.searchParams.set("userId", (decoded as any).id);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Token inválido ou expirado" },
      { status: 403 }
    );
  }
}
