export const produtoService = {
    produtosRecentes: async () =>   {
        const response = await fetch('/api/produtos/');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro na exibição de produtos");
          }
      
          return response.json();
    },

    todosProdutosComFiltro: async (busca: string | null, categoria: string | null, condicao: string | null) => {
        const params = new URLSearchParams();
      
        if (busca) params.append("busca", busca);
        if (categoria) params.append("categoria", categoria);
        if (condicao) params.append("condicao", condicao);
      
        const response = await fetch(`/api/produtos/filtrar?${params.toString()}`);
      
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro na exibição de produtos");
        }
      
        return response.json();
      }
}