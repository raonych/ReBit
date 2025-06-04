export const compraService = {
    
    iniciarCompra: async(dados: {remetenteNome: string | null, remetenteDoc: string | null, enderecoId: string }) => {

        const token = localStorage.getItem("token");
        const response = await fetch("/api/compra", {
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

      atualizaStatusCompra: async(status: string, compraId: number) =>{
        const token = localStorage.getItem("token");

        const response = await fetch("/api/compra", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({status, compraId}),
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
      }
};