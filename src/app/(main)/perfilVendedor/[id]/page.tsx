'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, MapPin, User, Phone, Loader } from 'lucide-react';
import Image from 'next/image';
import { usuarioService } from '@/lib/request/usuarios';
import ProdutoDiv from '@/lib/components/produtoDiv';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 fill-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
};

export default function PerfilVendedor() {
  const params = useParams();
  const id = params?.id as string;

  const [vendedor, setVendedor] = useState<any>(null);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const dadosVendedor = await usuarioService.exibirVendedor(id);
        const produtosVendedor = await usuarioService.exibirProdutosVendedor(id);
        setVendedor(dadosVendedor);
        setProdutos(produtosVendedor.produtos || []);
      } catch (erro) {
        console.error("Erro ao carregar dados do vendedor", erro);
      } finally {
        setLoading(false);
      }
    };
    buscarDados();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
          <Loader className="animate-spin mx-auto mb-4 h-8 w-8 text-gray-600" />
      </div>
    );
  }

  if (!vendedor) {
    return <div className="p-8 text-red-500">Vendedor não encontrado.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Seção do Perfil */}
      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Foto e Info Básica */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-zinc-200 mb-4">
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <User size={64} className="text-gray-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center">{vendedor.nome}</h1>
            <div className="mt-2">
              <StarRating rating={vendedor.notaVendedor} />
            </div>
          </div>

          {/* Informações Detalhadas */}
          <div className="w-full md:w-2/3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-gray-500" />
                <span>{vendedor.enderecos[0].cidade}, {vendedor.enderecos[0].UF}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-gray-500" />
                <span>{vendedor.telefone || "Não informado"}</span>
              </div>
              <div>
                <p className="text-gray-600">Membro desde {new Date(vendedor.criadoEm).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Avaliações */}
      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-8 mb-8">
        <h2 className="text-xl font-semibold mb-6">Avaliações Recentes</h2>
        <div className="space-y-6">
          {vendedor.avaliacoesRecebidas.length > 0 ? (
            vendedor.avaliacoesRecebidas.map((avaliacao: any) => (
              <div key={avaliacao.id} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={avaliacao.nota} />
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{avaliacao.avaliador.nome}</span>
                </div>
                {avaliacao.comentario && (
                  <p className="text-gray-700">{avaliacao.comentario}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(avaliacao.criadoEm).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Este vendedor ainda não possui avaliações.</p>
          )}
        </div>
      </div>

      {/* Seção de Produtos */}
      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-8">
        <h2 className="text-xl font-semibold mb-6">Produtos à Venda</h2>
        {produtos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos.map((produto: any) => (
              <ProdutoDiv
                key={produto.id}
                id={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                cidade={produto.vendedor.enderecos[0].cidade || "Desconhecida"}
                data={new Date(produto.criadoEm).toLocaleDateString("pt-BR")}
                imagemUrl={produto.fotos[0]?.url || "/placeholder.png"}
                jaFavoritado={produto.favoritos?.length > 0}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Este vendedor não possui produtos à venda no momento.</p>
        )}
      </div>
    </div>
  );
} 