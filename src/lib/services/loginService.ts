import { prisma } from "@/lib/prisma";
import { usuarioLoginSchema } from "@/lib/validators/usuario";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "chave_secreta_segura";

export const usuarioService = {
  login: async (body: any) => {
    const { email, senha, manterLogado } = usuarioLoginSchema.parse(body);

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      throw new Error("Usuário ou senha inválidos");
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      throw new Error("Usuário ou senha inválidos");
    }

    const expiresIn = manterLogado ? "7d" : "1h";

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET_KEY,
      { expiresIn }
    );

    const { senha: _, ...usuarioSemSenha } = usuario;

    return { usuario: usuarioSemSenha, token };
  },
};
