export const usuarioService = {
  cadastrar: async (dados: { nome: string; email: string; senha: string }) => {
    const response = await fetch("/api/auth/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro no cadastro");
    }

    return response.json();
  },
  logar: async (dados: { email: string; senha: string, manterLogado: boolean }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro no login");
    }

    return response.json();
  },
};
