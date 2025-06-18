import { exibirEnderecos } from "../services/enderecoService";

export const usuarioService = {
  cadastrar: async (dados: { nome: string; email: string; senha: string, telefone: string }) => {
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
  logout: async() =>{
    
    const token = localStorage.getItem("token");

    const response = await fetch("api/usuario", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = new Error("É necessário estar logado") as any;
      error.status = response.status;
      throw error;
    }

    localStorage.removeItem("token");
    window.dispatchEvent(new Event("logout"));
    
  },
  
  exibirPerfil: async() =>{

    const token = localStorage.getItem("token");

    const response = await fetch("/api/usuario",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

      if (!response.ok) {
        const errorData = await response.json();
        const error: any = new Error(errorData.error || "Erro ao retornar dados do usuário");
        error.status = response.status;
        throw error;
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
    const token = localStorage.getItem("token");

    const body = {
      cep: dados.cep,
      UF: dados.estado,
      cidade: dados.cidade,
      bairro: dados.bairro,
      rua: dados.rua,
      numero: dados.numero,
      complemento: dados.complemento,
    };

    const response = await fetch("/api/auth/enderecos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao cadastrar endereço");
    }

    return response.json();
  },

  exibirEnderecos: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token não encontrado. Usuário não autenticado.");
    }

    const response = await fetch("/api/auth/enderecos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    if (!response.ok && response.status != 404) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao retornar endereço");
    }

    return response.json();
  },

  exibirMeusProdutos: async() =>{

    const token = localStorage.getItem("token");

    const response = await fetch("/api/usuario/produtos",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
      
      if (!response.ok) {
        const error = new Error("Erro ao buscar produtos") as any;
        error.status = response.status;
        throw error;
      }

      return response.json();

    },

  exibirVendedor: async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/vendedor/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao exibir vendedor");
    }

    return response.json();
  },

  exibirProdutosVendedor: async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/vendedor/${id}/produtos`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao exibir produtos do vendedor");
    }

    return response.json();
  },

    exibirMinhasAvaliacoes: async() =>{

      const token = localStorage.getItem("token");


      const response = await fetch("/api/avaliacao",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      
      if (!response.ok) {
        const error = new Error("Erro ao buscar avaliações") as any;
        error.status = response.status;
        throw error;
      }

      return response.json();


    },
    exibirMinhasVendas: async() =>{

      const token = localStorage.getItem("token");


      const response = await fetch("/api/vendedor/vendas",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      
      if (!response.ok) {
        const error = new Error("Erro ao buscar vendas") as any;
        error.status = response.status;
        throw error;
      }

      return response.json();


    },
    exibirMinhasCompras: async () =>{
      const token = localStorage.getItem("token");

      const response = await fetch("/api/compra",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      
      if (!response.ok) {
        const error = new Error("Erro ao buscar compras") as any;
        error.status = response.status;
        throw error;
      }

      return response.json();

    },

    enviarAvaliacao: async (dados: any) =>{
      const token = localStorage.getItem("token");
    
      const response = await fetch("/api/avaliacao",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(dados),
      });
      
      if (!response.ok) {
        const error = new Error("Erro ao enviar avaliacao") as any;
        error.status = response.status;
        throw error;
      }

      return response.json();

    },

    atualizarFotoPerfil: async (fotoUrl: string) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado. Usuário não autenticado.");
      }

      const response = await fetch("/api/usuario/foto", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fotoUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar foto de perfil");
      }

      return response.json();
    },

    atualizarEndereco: async (enderecoId: number, dados: {
      cep: string;
      estado: string;
      cidade: string;
      bairro: string;
      rua: string;
      numero: string;
      complemento?: string;
    }) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado. Usuário não autenticado.");
      }

      const body = {
        cep: dados.cep,
        UF: dados.estado,
        cidade: dados.cidade,
        bairro: dados.bairro,
        rua: dados.rua,
        numero: dados.numero,
        complemento: dados.complemento,
      };

      const response = await fetch(`/api/auth/enderecos/${enderecoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar endereço");
      }

      return response.json();
    },

    atualizarPerfil: async (dados: any) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado. Usuário não autenticado.");
      }

      const response = await fetch("/api/usuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar perfil");
      }

      return response.json();
    },

};
