const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const path = require('path');

async function main() {
    const categorias = [
        'Placas-mãe',
        'Fontes',
        'SSDs',
        'Placas de vídeo',
        'Coolers',
        'Processadores',
        'Memórias RAM',
        'Placas de rede',
        'Gabinetes',
        'Notebooks quebrados'
    ];

    const imagens = {
        'Placas-mãe': '/hardware.jpg',
        'Fontes': '/fonte.jpg',
        'SSDs': '/ssd.jpg',
        'Placas de vídeo': '/placaVideo.jpg',
        'Coolers': '/cooler.jpg',
        'Processadores': '/processador.jpg',
        'Memórias RAM': '/ram.jpg',
        'Placas de rede': '/placaRede.jpg',
        'Gabinetes': '/gabinete.jpg',
        'Notebooks quebrados': '/notebook.jpg'
    };

    // 1. Criar categorias
    const categoriasCriadas = await Promise.all(
        categorias.map((nome) =>
            prisma.categoria.create({
                data: { nome, descricao: `Categoria de ${nome}` }
            })
        )
    );

    const hashedPassword = await bcrypt.hash("senha123", 10);

    // 2. Criar um vendedor com endereço
    const vendedor = await prisma.usuario.create({
        data: {
            nome: `Paulo Rocha`,
            email: `paulorocha@gmail.com`,
            senha: hashedPassword,
            telefone: `11948572394`, 
            enderecos: {
                create: {
                    cidade: "Guarulhos",
                    UF: "SP",
                    bairro: `Vila Florida`,
                    rua: `R. Raimundo Almeida de Araújo`,
                    numero: `101`,
                    cep: `07122000`
                }
            }
        }
    });

    // 3. Criar um produto por categoria com imagem correta
    const produtos = await Promise.all(
        categoriasCriadas.map((categoria) =>
            prisma.produto.create({
                data: {
                    nome: `${categoria.nome} danificado`,
                    descricao: `Produto da categoria ${categoria.nome} em estado danificado ou usado.`,
                    preco: Math.floor(Math.random() * (800 - 50 + 1)) + 50,
                    condicao: Math.random() > 0.5 ? 'usado' : 'danificado',
                    vendedorId: vendedor.id,
                    categoriaId: categoria.id,
                    fotos: {
                        create: {
                            url: imagens[categoria.nome]
                        }
                    }
                }
            })
        )
    );

    console.log("Seed finalizado com sucesso!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    });