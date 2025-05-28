export const compraService = {
    
    iniciarCompra: async(dados: any) => {

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
};