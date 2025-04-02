export const usuarioService = {
  cadastrar: async (dados: {
    nome: string;
    email: string;
    senha: string;
  }) => {
    const response = await fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro no cadastro');
    }

    return response.json();
  },
};