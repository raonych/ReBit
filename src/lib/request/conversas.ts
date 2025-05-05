export const conversaService = {
    exibirConversa: async (conversaId: number) =>   {
        const response = await fetch(`api/conversas/${conversaId}`)

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao exibir conversa");
          }
      
          return response.json();
    },
    
    listarConversas: async () => {
        const token = localStorage.getItem("token");

        const response = await fetch("api/conversas", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro na exibição de conversas");
          }
      
          return response.json();
    },

    listarConversasVendedor: async () => {
        const token = localStorage.getItem("token");

        const response = await fetch("api/vendedor/conversas", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro na exibição de conversas");
          }
      
          return response.json();
    }
}