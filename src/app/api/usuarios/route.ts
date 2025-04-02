import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { usuarioCreateSchema } from '@/lib/validators/usuario';
import * as bcrypt from 'bcrypt';
import { z } from 'zod';  // Importação crucial para o tratamento de erros

export async function POST(request: Request) {
  try {
    // 1. Parse e validação do corpo da requisição
    const body = await request.json();
    const validatedData = usuarioCreateSchema.parse(body);

    // 2. Verificar se email já está cadastrado
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: validatedData.email }
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "Email já está em uso" },
        { status: 400 }
      );
    }

    // 3. Hash da senha (importante para segurança)
    const hashedPassword = await bcrypt.hash(validatedData.senha, 10);

    // 4. Criação do usuário no banco de dados
    const novoUsuario = await prisma.usuario.create({
      data: {
        ...validatedData,
        senha: hashedPassword
      }
    });

    // 5. Remover a senha do objeto de retorno
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _, ...usuarioSemSenha } = novoUsuario;

    // 6. Retornar resposta de sucesso
    return NextResponse.json(usuarioSemSenha, { status: 201 });

  } catch (error) {
    console.error("Erro no cadastro:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Dados inválidos",
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}