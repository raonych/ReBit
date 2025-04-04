import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function POST(req: Request){
    try{
        const body = await req.json();
        const {email, senha} = body;

        if (!email || !senha){
            return NextResponse.json({error: "E-mail e senha são obrigatórios"})
        }

        const usuario = await prisma.usuario.findUnique({
            where: {email}, 
        })

        if(!usuario){
            return NextResponse.json({error: "Usuário não encontrado"}, {status: 400});
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if(!senhaValida) {
            return NextResponse.json({error: "Senha incorreta"}, {status: 401});
        }

        const token = jwt.sign(
            {id: usuario.id, email: usuario.email},
            process.env.JWT_SECRET as string,
            {expiresIn: "1h"}
        )

        return NextResponse.json({token});
    }
    catch(error){
        return NextResponse.json({error: 'Erro ao processar login'}, {status: 500});
    }
}

