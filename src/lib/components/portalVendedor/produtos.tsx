"use client";
import React, { useEffect, useState } from "react";
import { Loader, MapPin } from "lucide-react";
import { usuarioService } from "@/lib/request/usuarios";

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

  // ✅ Caso 404 – Nenhum produto anunciado
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

  // ❌ Outros erros
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
          {produtos.map((item, index) => (
            <div
              key={item?.id || index}
              className="w-74 bg-white rounded-lg overflow-hidden shadow-sm border border-zinc-200"
            >
              <div className="bg-gray-500 h-48" />
              <div className="p-4">
                <div className="font-bold text-xl mb-2">{item.preco}</div>
                <div className="font-bold text-xl mb-2">{item.nome}</div>
                <div className="flex items-center gap-1 text-gray-600 mb-1">
                  <MapPin size={16} />
                  <span className="text-sm"></span>
                </div>
                <div className="text-gray-600 text-sm">03/04/2025</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Produtos;
