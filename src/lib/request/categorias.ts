export const categoriaService = {
    categorias: async () =>   {
        const response = await fetch('api/categorias');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro na exibição de categorias");
          }
      
          return response.json();
    }
}  