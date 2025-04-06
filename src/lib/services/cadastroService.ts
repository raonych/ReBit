import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

export async function criarUsuario(dados: { nome: string; email: string; senha: string}) {
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email: dados.email }
  });

  if (usuarioExistente) {
    throw new Error('Email já cadastrado');
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(dados.senha, 10);

  return await prisma.usuario.create({
    data: { ...dados, senha: hashedPassword }
  });
}
