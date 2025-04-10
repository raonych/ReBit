export const produtoService = {
    produtosRecentes: async () =>   {
        const response = await fetch('api/produtos');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro na exibição de produtos");
          }
      
          return response.json();
    }
}