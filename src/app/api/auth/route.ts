import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { usuarioLoginSchema } from '@/lib/validators/usuario';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';  // Para gerar tokens JWT
import { z } from 'zod';

const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_segura';

export async function POST(request: Request) {
  try {
    // 1. Parse e validação dos dados de entrada
    const body = await request.json();
    const { email, senha, manterLogado } = usuarioLoginSchema.parse(body);

    // 2. Buscar usuário pelo email
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário ou senha inválidos" },
        { status: 401 }
      );
    }

    // 3. Verificar se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return NextResponse.json(
        { error: "Usuário ou senha inválidos" },
        { status: 401 }
      );
    }

    // 4. Verifica se o usuario deseja se manter logado e gera token JWT

    const expiresIn = manterLogado ? "7d" : "1h";

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET_KEY,
      { expiresIn } 
    );

    // 5. Remover a senha do objeto de retorno
    const { senha: _, ...usuarioSemSenha } = usuario;

    // 6. Retornar resposta com token
    return NextResponse.json(
      { usuario: usuarioSemSenha, token },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro no login:", error);

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
