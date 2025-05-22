import { prisma } from '@/lib/prisma';

export async function favoritaProduto(produtoId: number, usuarioId: number){
    try{
    const produto = await prisma.produto.findUnique({where:{id: produtoId}});

    if(!produto){
        return{status:404, data:{success: false, message:"Produto não existente"}};
    }

    const jaFavoritado = await prisma.favorito.findFirst({
        where: { produtoId, usuarioId },
      });
  
      if (jaFavoritado) {
        return { status: 400, data: {success: false, message: "Produto já favoritado" } };
      }

    const favoritaProduto = await prisma.favorito.create({
       data: {produtoId,usuarioId}
    });

    return{ status:200, data:{success: true, message:"Produto adicionado aos favoritos"}};

    }catch(error){
        console.error("Erro ao favoritar produto:", error);
        return { status: 500, data: { error: "Erro interno do servidor" } };

    }
}

export async function exibeFavoritos(usuarioId: number){
    try{
        const favoritos = await prisma.favorito.findMany({
            where: {usuarioId},
            include: {produto: true}
          });

          if(favoritos.length === 0){
            return { status: 200, data: { message: "Nenhum produto encontrado", favoritos: []} };
          }

          return{status: 200, data: {favoritos}};
          
    }catch(error){
        console.error("Erro ao retornar produtos:", error)
        return { status: 500, data: { error: "Erro interno do servidor" } };
    }
}

export async function desfavoritaProduto(produtoId: number, usuarioId: number){
    try{
        const favoritado = await prisma.favorito.findFirst({
            where: { produtoId, usuarioId },
        });

        if (!favoritado){
            return { status: 400, data: {success: false, message: "Produto não favoritado" } };
        }
        const desfavorita = await prisma.favorito.delete({
            where: { id: favoritado.id },
        })

        return {status: 200, data: { success: true, message: "Produto removido da lista de favoritos" } };

    }catch(error){
        console.error("Erro ao favoritar produto:", error);
        return { status: 500, data: {success: false, error: "Erro interno do servidor" } };
    }

}
