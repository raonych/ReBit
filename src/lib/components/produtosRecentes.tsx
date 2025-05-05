"use client";
import { useState, useEffect, useRef } from "react";
import { produtoService } from "@/lib/request/produto";
import { MapPin, ChevronRight } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProdutosRecentes() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const exibeRecentes = async () => {
      const produtos = await produtoService.produtosRecentes();
      setProdutos(produtos);
      setLoading(false);
    };
    exibeRecentes();
  }, []);

  const produtosSkeleton = Array.from({ length: 4 });

  return (
    <section
      className="py-12 px-4"
      style={{
        backgroundImage: 'url("/Background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Produtos em destaque</h2>
        <div className="relative">
          <div className="grid grid-flow-col auto-cols-max overflow-hidden gap-7">
            {(loading ? produtosSkeleton : produtos).map((item, index) => (
              <div
                key={item?.id || index}
                className="w-74 bg-white rounded-lg overflow-hidden shadow-sm border border-zinc-200"
              >
                {loading ? (
                  <Skeleton height={192} />
                ) : (
                  <div className="bg-gray-500 h-48" />
                )}
                <div className="p-4">
                  <div className="font-bold text-xl mb-2">
                    {loading ? <Skeleton width={80} /> : item.preco}
                  </div>
                  <div className="font-bold text-xl mb-2">
                    {loading ? <Skeleton width={120} /> : item.nome}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <MapPin size={16} />
                    {loading ? (
                      <Skeleton width={60} />
                    ) : (
                      <span className="text-sm"></span>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {loading ? <Skeleton width={80} /> : "03/04/2025"}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!loading && (
            <button className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2">
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
