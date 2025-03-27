import { prisma } from '@/../lib/prisma';
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const user = await prisma.user.create({ data: { name, email, password } });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 400 });
  }
}
