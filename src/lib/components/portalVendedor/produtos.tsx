"use client";
import React, { useEffect, useState } from "react";
import { Loader, MapPin } from "lucide-react";
import { usuarioService } from "@/lib/request/usuarios";
import ProdutoDiv from "../produtoDiv";
import Skeleton from "react-loading-skeleton";

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ status: number; message: string } | null>(null);

  useEffect(() => {
    const exibeMeusProdutos = async () => {
      try {
        const meusProdutos = await usuarioService.exibirMeusProdutos();
        setProdutos(meusProdutos);
      } catch (err: any) {
        setError({ status: err.status, message: err.message });
      } finally {
        setIsLoading(false);
      }
    };

    exibeMeusProdutos();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full lg:w-1/2 flex-grow">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full flex items-center justify-center p-8">
          <div className="text-center">
            <Loader className="h-10 w-10 animate-spin mx-auto" />
            <p className="mt-4 text-gray-500">Carregando produtos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error?.status === 404) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 w-full lg:w-1/2 flex-grow">
        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
          <p className="text-gray-600 text-lg mb-4">
            Você ainda não anunciou nenhum produto.
          </p>
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Começar a vender
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-1/2 flex-grow">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full p-6">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <p className="text-red-600 mb-2">Erro</p>
              <p className="text-gray-600">{error.status}</p>
              <button
                onClick={() => location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2 flex-grow">
      <div className="relative">
        <div className="grid grid-cols-3 auto-rows gap-11">
          {(produtos).map((item, index) => (
              <div key={item?.id || index} className="flex-shrink-0">
                  <ProdutoDiv
                    id={item.id}
                    nome={item.nome}
                    preco={item.preco}
                    cidade={item.vendedor.enderecos[0].cidade || "Desconhecida"}
                    data={new Date(item.criadoEm).toLocaleDateString("pt-BR")}
                    imagemUrl={item.imagemUrl || "/placeholder.png"}
                  />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Produtos;
