import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "chave_secreta_segura";

export async function criarUsuario(dados: {
  nome: string;
  email: string;
  senha: string;
  telefone: string; 
}) {
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email: dados.email },
  });

  if (usuarioExistente) {
    throw new Error("Email já cadastrado");
  }

  //hash da senha
  const hashedPassword = await bcrypt.hash(dados.senha, 10);

  const novoUsuario = await prisma.usuario.create({
    data: { ...dados, senha: hashedPassword, telefone:dados.telefone},
  });

  const token = jwt.sign(
    { id: novoUsuario.id, email: novoUsuario.email },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  const { senha, ...usuarioSemSenha } = novoUsuario;

  return { usuario: usuarioSemSenha, token };
}
