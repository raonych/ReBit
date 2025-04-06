// apenas garante que o token existe
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const protectedPaths = ["/api/testeMdw/criar"];
  const currentPath = req.nextUrl.pathname;

  if (protectedPaths.some((path) => currentPath.startsWith(path))) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/testeMdw/criar"],
};
