import { prisma } from '@/../lib/prisma';
import { NextResponse } from "next/server";
import { Cors } from '@/utils/cors';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const userId = parseInt(params.id);
  const user = await prisma.user.findUnique({
    where: {
        id: userId,
    },
  });
  const res = NextResponse.json(user);
  
  return Cors(res);

}

