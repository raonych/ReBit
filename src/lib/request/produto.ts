export const produtoService = {
    produtosRecentes: async () =>   {
        const token = localStorage.getItem("token");
      const response = await fetch('/api/produtos/',
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro na exibição de produtos");
          }
      
          return response.json();
    },
    produtoUnico: async (id: string) =>{
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/produtos/${id}`,
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro na exibição do produto");
          }
      
          return response.json();
    },
    todosProdutosComFiltro: async (busca: string | null, categoria: string | null, condicao: string | null) => {
        const params = new URLSearchParams();
        const token = localStorage.getItem("token");

        if (busca) params.append("busca", busca.toLowerCase());
        if (categoria) params.append("categoria", categoria.toLowerCase());
        if (condicao) params.append("condicao", condicao.toLowerCase());
      
        const response = await fetch(`/api/produtos/filtrar?${params.toString()}`,{
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro na exibição de produtos");
        }
      
        return response.json();
      },
      
      cadastrarProduto: async (dados: any) => {
        const token = localStorage.getItem("token");
        
        const response = await fetch("/api/produtos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dados),
        });
      
        let data;
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      
        if (!response.ok) {
          throw new Error(data?.error || "Erro no produto");
        }
      
        return data;
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
      },

      ExcluirProduto: async (produtoId: string) => {
        const token = localStorage.getItem("token"); 

        try {
          const response = await fetch(`/api/produtos/${produtoId}`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            throw new Error("Erro ao excluir produto");
          }
    
          const data = await response.json();
          return data; 
        } catch (error) {
          console.error("Erro ao excluir produto:", error);
          return { produtos: [] }; 
        }
      }
      
}