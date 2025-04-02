import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { usuarioCreateSchema } from '@/lib/validators/usuario';
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { z } from 'zod';  // Importação crucial para o tratamento de erros

const SECRET_KEY = process.env.JWT_SECRET || "chave_super_secreta";


//Rota para verificar autenticação
export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    
    const usuario = await prisma.usuario.findUnique({ where: { id: decoded.id} }); 

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ id: usuario.id, email: usuario.email, nome: usuario.nome });

  } catch (error) {
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
  }
}


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