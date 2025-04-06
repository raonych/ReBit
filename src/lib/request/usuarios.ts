import { cadastrarEndereco } from "../services/enderecoService";

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
  logar: async (dados: {
    email: string;
    senha: string;
    manterLogado: boolean;
  }) => {
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

  cadastrarEndereco: async (dados: {
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento?: string;
  }) => {
    const token = localStorage.getItem("token"); // ou outro local que você armazena

    const response = await fetch("/api/auth/enderecos/criar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao cadastrar endereço");
    }

    return response.json();
  },
};
