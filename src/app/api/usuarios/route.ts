import { NextResponse } from 'next/server';
import { usuarioCreateSchema } from '@/lib/validators/usuario';
import { criarUsuario } from '@/lib/services/usuarioService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = usuarioCreateSchema.parse(body);

    const novoUsuario = await criarUsuario(validatedData);
    
    return NextResponse.json(novoUsuario, { status: 201 });

  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
