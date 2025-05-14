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

  const hashedPassword = await bcrypt.hash("senha123", 10);

  // 2. Criar vendedores com endereço
  const vendedores = await Promise.all(
    Array.from({ length: 3 }).map((_, i) =>
      prisma.usuario.create({
        data: {
          nome: `Vendedor ${i + 1}`,
          email: `vendedor${i + 1}@gmail.com`,
          senha: hashedPassword,
          telefone: `1199999000${i + 1}`,
          enderecos: {
            create: {
              cidade: "São Paulo",
              UF: "SP",
              bairro: `Bairro ${i + 1}`,
              rua: `Rua ${i + 1}`,
              numero: `${100 + i}`,
              cep: `0717201${i + 1}`
            }
          }
        }
      })
    )
  );

  // 3. Criar vários produtos por categoria, por vendedor
  const produtos = [];
  for (const categoria of categoriasCriadas) {
    for (const vendedor of vendedores) {
      const produto = await prisma.produto.create({
        data: {
          nome: `${categoria.nome} danificado`,
          descricao: `Produto da categoria ${categoria.nome} em estado danificado ou usado.`,
          preco: Math.floor(Math.random() * (800 - 50 + 1)) + 50,
          condicao: Math.random() > 0.5 ? 'usado' : 'danificado',
          imagemUrl: `/hardware.jpg`,
          vendedorId: vendedor.id,
          categoriaId: categoria.id
        }
      });
      produtos.push(produto);
    }
  }

  // 4. Criar compradores
  const compradores = await Promise.all(
    [1, 2, 3].map((i) =>
      prisma.usuario.create({
        data: {
          nome: `Comprador ${i}`,
          email: `comprador${i}@exemplo.com`,
          senha: hashedPassword,
          telefone: `1199998888${i}`
        }
      })
    )
  );

  // 5. Criar compras pendentes e aprovadas
  await Promise.all(
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

  await prisma.compra.create({
    data: {
      compradorId: compradores[0].id,
      produtoId: produtos[produtos.length - 1].id,
      valor: produtos[produtos.length - 1].preco,
      metodoPagamento: 'cartao_credito',
      status: 'aprovado'
    }
  });

  await prisma.avaliacao.create({
    data: {
      avaliadorId: compradores[0].id,
      avaliadoId: vendedores[0].id,
      nota: 4,
      comentario: 'Vendedor confiável.'
    }
  });

  // 6. Criar conversas com pelo menos 3 vendedores diferentes
  for (const comprador of compradores) {
    const produtosDeVendedoresDiferentes = produtos.filter(
      (p, i, arr) =>
        arr.findIndex((pp) => pp.vendedorId === p.vendedorId) === i
    ).slice(0, 3);

    for (const produto of produtosDeVendedoresDiferentes) {
      await prisma.conversa.create({
        data: {
          vendedorId: produto.vendedorId,
          compradorId: comprador.id,
          produtoId: produto.id,
          ultimaMensagem: `Última mensagem do ${comprador.nome}`,
          mensagens: {
            create: [
              {
                texto: `Olá, estou interessado neste produto.`,
                remetenteId: comprador.id
              },
              {
                texto: `Pode me dar mais detalhes?`,
                remetenteId: comprador.id
              }
            ]
          }
        }
      });
    }
  }

  console.log("Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
