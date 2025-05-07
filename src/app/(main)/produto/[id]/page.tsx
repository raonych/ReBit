'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingCart, MessageCircleMore } from 'lucide-react';

const PaginaProduto: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const [produto, setProduto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        const resposta = await fetch(`/api/produtos/${id}`);
        const dados = await resposta.json();
        setProduto(dados);
      } catch (erro) {
        console.error("Erro ao carregar produto", erro);
      } finally {
        setLoading(false);
      }
    };
    buscarProduto();
  }, [id]);

  if (loading) {
    return <div className="p-8">Carregando produto...</div>;
  }

  if (!produto) {
    return <div className="p-8 text-red-500">Produto não encontrado.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Imagem do produto */}
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-lg overflow-hidden border">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* Descrição */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-2xl font-semibold mb-2">Descrição</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{produto.descricao}</p>
        </div>
      </div>

      {/* Detalhes de compra */}
      <div className="bg-white p-6 rounded-lg shadow border h-fit">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h1>
        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition">
            <ShoppingCart className="w-5 h-5" />
            Comprar
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-green-700 text-green-500 hover:bg-green-50 font-semibold py-3 rounded-md transition">
            <MessageCircleMore className="w-5 h-5" />
            Chat
          </button>
        </div>
        <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Vendedor</h2>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Nome:</strong> {produto.vendedor.nome}</p>
              <p><strong>Cidade:</strong> {produto.vendedor.enderecos.cidade || "Não especificado"},{produto.vendedor.enderecos.UF || "Não especificado"}</p>
              <p><strong>Endereço:</strong> {produto.vendedor.enderecos.Rua || "Não especificado"}</p>
              <p><strong>Telefone:</strong> {produto.vendedor.Telefone || "Não especificado"}</p>
            </div>
            <a
              href="/perfil/joao-silva"
              className="inline-block mt-3 text-sm text-blue-600 hover:underline"
            >
              Ver perfil do vendedor
            </a>
          </div>
        </div>
    </div>
  );
};

export default PaginaProduto;
