import { prisma } from '@/../lib/prisma';
import { NextResponse } from "next/server";
import { Cors } from '@/../public/utils/cors';

export async function GET() {
  const users = await prisma.user.findMany();
  const res = NextResponse.json(users);
  
  return Cors(res);

}


export async function POST(req: Request) {
  Cors;
  try {
    const { name, email, password } = await req.json();

    const duplicatedEmail = await prisma.user.findUnique({
      where: { email: email}
    });
    console.log(duplicatedEmail);
    if(!duplicatedEmail){
      const user = await prisma.user.create({ data: { name, email, password } });
      const res = NextResponse.json(user, { status: 201 });
      return Cors(res);
    }else{
      const res = NextResponse.json({message: "Usuário já cadastrado"}, { status: 500 });
      return Cors(res);
    }

  } catch (error) {
    const res = NextResponse.json({ error: "Erro ao criar usuário" }, { status: 400 });

    return Cors(res);
  }
}
