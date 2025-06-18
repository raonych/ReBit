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
        'Notebooks'
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
        'Notebooks': '/notebook.jpg'
    };

    const descricoes = {
        'Placas-mãe': 'Essa placa-mãe usada está em ótimo estado de funcionamento, com todos os capacitores íntegros e sem sinais de oxidação. Compatível com processadores da linha Intel 9ª geração e memória DDR4.',
        'Fontes': 'Fonte de alimentação semi-nova com potência de 500W. O produto foi testado e está funcionando perfeitamente, com poucos sinais de uso.',
        'SSDs': 'SSD danificado, vendido para recuperação de dados ou reaproveitamento de carcaça. O dispositivo apresenta falhas na leitura e não é reconhecido em sistemas operacionais.',
        'Placas de vídeo': 'Placa de vídeo usada modelo GTX 1060 de 6GB, testada e funcionando. Ela apresenta apenas leves sinais de uso na carcaça e nos conectores.',
        'Coolers': 'Cooler para CPU semi-novo, retirado de uma máquina de demonstração. As aletas estão limpas e a ventoinha gira suavemente.',
        'Processadores': 'Processador usado Intel i5 9400F em perfeito estado. O produto apresenta apenas marcas de encaixe no socket, mas sem danos físicos ou aquecimento excessivo.',
        'Memórias RAM': 'Módulo de memória RAM DDR4 8GB danificado — apresenta falhas intermitentes e não é reconhecido em todos os slots.',
        'Placas de rede': 'Placa de rede PCIe semi-nova com suporte a velocidades de até 1Gbps. Com poucos dias de uso, está em perfeito funcionamento.',
        'Gabinetes': 'Gabinete usado com marcas visíveis de uso, incluindo arranhões e um pequeno amassado na lateral.',
        'Notebooks': 'Notebook danificado — não liga e apresenta possível falha na placa-mãe. A carcaça está em estado razoável e a tela aparentemente intacta. Produto vendido no estado, sem garantia de funcionamento.'
    };

    const condicoes = {
        'Placas-mãe': 'usado',
        'Fontes': 'semi-novo',
        'SSDs': 'danificado',
        'Placas de vídeo': 'usado',
        'Coolers': 'semi-novo',
        'Processadores': 'usado',
        'Memórias RAM': 'danificado',
        'Placas de rede': 'semi-novo',
        'Gabinetes': 'usado',
        'Notebooks': 'danificado'
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
                    descricao: descricoes[categoria.nome],
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