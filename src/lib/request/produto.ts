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
      
        if (busca) params.append("busca", busca.toLowerCase());
        if (categoria) params.append("categoria", categoria.toLowerCase());
        if (condicao) params.append("condicao", condicao.toLowerCase());
      
        const response = await fetch(`/api/produtos/filtrar?${params.toString()}`);
      
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro na exibição de produtos");
        }
      
        return response.json();
      },
      
      cadastrarProduto: async(form: FormData) =>{

         const response = await fetch('/api/produtos',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
    });
      
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro na exibição de produtos");
        }
      
        return response.json();
      },
      favoritarProduto: async (id: string, favorito: boolean) => {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(`/api/favoritos/${id}`, {
            method: favorito ? 'DELETE' : 'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          });
          return response.ok;
        } catch (error) {
          console.error("Erro ao favoritar:", error);
          return false;
        }
      },
      
      listarFavoritos: async () => {
        const token = localStorage.getItem("token");
        
        try {
          const response = await fetch(`/api/favoritos`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            throw new Error("Erro ao buscar favoritos");
          }
    
          const data = await response.json();
          return data; 
        } catch (error) {
          console.error("Erro ao buscar favoritos:", error);
          return { produtos: [] }; 
        }
      }
}