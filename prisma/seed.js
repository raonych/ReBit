const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

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

  // 1. Criar categorias
  const categoriasCriadas = await Promise.all(
    categorias.map((nome) =>
      prisma.categoria.create({
        data: { nome, descricao: `Categoria de ${nome}` }
      })
    )
  );

  // Senha padrão para todos os usuários: "senha123"
  const hashedPassword = await bcrypt.hash("senha123", 10);
  
  const vendedor = await prisma.usuario.create({
    data: {
      nome: "vendedor",
      email: "vendedor@gmail.com",
      senha: hashedPassword
    }
  })

  // 2. Criar 10 produtos (um por categoria) com vendedorId = 1
  const produtos = await Promise.all(
    categoriasCriadas.map((categoria, index) =>
      prisma.produto.create({
        data: {
          nome: `${categoria.nome} danificado`,
          descricao: `Produto da categoria ${categoria.nome} em estado danificado ou usado.`,
          preco: Math.floor(Math.random() * (800 - 50 + 1)) + 50,
          condicao: index % 2 === 0 ? 'usado' : 'danificado',
          imagemUrl: `https://example.com/hardware${index + 1}.jpg`,
          vendedorId: 1,
          categoriaId: categoria.id
        }
      })
    )
  );

  
  // 3. Criar 3 usuários compradores
  const compradores = await Promise.all(
    [1, 2, 3].map((i) =>
      prisma.usuario.create({
        data: {
          nome: `Comprador ${i}`,
          email: `comprador${i}@exemplo.com`,
          senha: hashedPassword,
          telefone: `1199999000${i}`
        }
      })
    )
  );

  // 4. Cada comprador faz 1 compra pendente
  const comprasPendentes = await Promise.all(
    compradores.map((comprador, i) =>
      prisma.compra.create({
        data: {
          compradorId: comprador.id,
          produtoId: produtos[i].id,
          valor: produtos[i].preco,
          metodoPagamento: 'pix',
          status: 'pendente'
        }
      })
    )
  );

  // 5. Um comprador faz compra aprovada e avaliação
  const compraAprovada = await prisma.compra.create({
    data: {
      compradorId: compradores[0].id,
      produtoId: produtos[9].id,
      valor: produtos[9].preco,
      metodoPagamento: 'cartao_credito',
      status: 'aprovado'
    }
  });

  await prisma.avaliacao.create({
    data: {
      avaliadorId: compradores[0].id,
      avaliadoId: 1,
      nota: 4,
      comentario: 'Vendedor honesto, produto como descrito.'
    }
  });

  // 6. Criar conversas com 2+ mensagens cada
  for (let i = 0; i < compradores.length; i++) {
    const comprador = compradores[i];
    const produto = produtos[i + 3];

    const conversa = await prisma.conversa.create({
      data: {
        vendedorId: 1,
        compradorId: comprador.id,
        produtoId: produto.id,
        ultimaMensagem: `Última mensagem do ${comprador.nome}`,
        mensagens: {
          create: [
            {
              texto: `Olá, ainda está disponível?`,
              remetenteId: comprador.id
            },
            {
              texto: `Estou realmente interessado.`,
              remetenteId: comprador.id
            }
          ]
        }
      }
    });
  }

  // 7. Adicionar favoritos
  await Promise.all(
    compradores.flatMap((comprador) =>
      produtos.slice(0, 5).map((produto) =>
        prisma.favorito.create({
          data: {
            usuarioId: comprador.id,
            produtoId: produto.id
          }
        })
      )
    )
  );

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
