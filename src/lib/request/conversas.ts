export const conversaService = {
    exibirConversa: async (conversaId: number) =>   {
        const response = await fetch(`api/conversas/${conversaId}`)

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro na exibição de produtos");
          }
      
          return response.json();
    }
}