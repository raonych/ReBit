"use client";
import { useState, useEffect } from "react";
import type React from "react";

import { produtoService } from "@/lib/request/produto";
import ProdutoDiv from "@/lib/components/produtoDiv";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProdutosRecentes() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [loading, setLoading] = useState(true);
  const [produtosPorPagina, setProdutosPorPagina] = useState(4);

  // Função para determinar quantos produtos mostrar baseado no tamanho da tela
  const updateProdutosPorPagina = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        setProdutosPorPagina(1); // Mobile: 1 produto
      } else if (window.innerWidth < 768) {
        setProdutosPorPagina(2); // Tablet pequeno: 2 produtos
      } else if (window.innerWidth < 1024) {
        setProdutosPorPagina(3); // Tablet: 3 produtos
      } else {
        setProdutosPorPagina(4); // Desktop: 4 produtos
      }
    }
  };

  useEffect(() => {
    const exibeRecentes = async () => {
      try {
        const produtos = await produtoService.produtosRecentes();
        setProdutos(produtos);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };
    exibeRecentes();
  }, []);

  useEffect(() => {
    updateProdutosPorPagina();

    const handleResize = () => {
      updateProdutosPorPagina();
      // Reset para primeira página quando redimensionar
      setPaginaAtual(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

  const irParaAnterior = () => {
    setPaginaAtual((prev) => Math.max(prev - 1, 0));
  };

  const irParaProximo = () => {
    setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas - 1));
  };

  const produtosExibidos = produtos.slice(
    paginaAtual * produtosPorPagina,
    (paginaAtual + 1) * produtosPorPagina
  );

  const skeletons = Array.from({ length: produtosPorPagina });

  return (
    <section
      className="py-8 sm:py-12 px-2 sm:px-4 lg:px-8 relative"
      style={{
        backgroundImage: 'url("/Background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
          Produtos em destaque
        </h2>

        {/* Container com posicionamento relativo para os botões */}
        <div className="relative">
          {/* Container dos Produtos */}
          <div className="overflow-hidden px-12 sm:px-16 md:px-20">
            <div
              className="flex justify-center items-center"
              style={
                {
                  "--gap-size": "32px", // ← ALTERE ESTE VALOR PARA MUDAR O ESPAÇAMENTO (16px, 24px, 32px, 40px, 48px, etc.)
                } as React.CSSProperties
              }
            >
              {(loading ? skeletons : produtosExibidos).map((item, index) => (
                <div
                  key={item?.id || index}
                  className="flex-shrink-0"
                  style={{
                    marginRight:
                      index <
                      (loading
                        ? skeletons.length - 1
                        : produtosExibidos.length - 1)
                        ? "var(--gap-size)"
                        : "0",
                  }}
                >
                  {loading ? (
                    <div className="w-full max-w-[280px]">
                      <div className="w-74">
                        <Skeleton height={192} />
                        <div className="p-4">
                          <Skeleton width={80} height={24} className="mb-2" />
                          <Skeleton width={120} height={20} className="mb-2" />
                          <Skeleton width={60} height={16} className="mb-1" />
                          <Skeleton width={80} height={16} />
                        </div>
                  </div>  
                    </div>
                  ) : (
                    <div className="w-full max-w-[280px] relative">
                      <ProdutoDiv
                        id={item.id}
                        nome={item.nome}
                        preco={item.preco}
                        cidade={
                          item.vendedor.enderecos[0]?.cidade || "Desconhecida"
                        }
                        data={new Date(item.criadoEm).toLocaleDateString(
                          "pt-BR"
                        )}
                        imagemUrl={item.fotos[0]?.url || "/placeholder.png"}
                        jaFavoritado={item.favoritos.length > 0}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Botões posicionados absolutamente */}
          {/* Botão Anterior */}
          <button
            onClick={irParaAnterior}
            disabled={paginaAtual === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
            style={{
              backgroundImage: 'url("/Background.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            aria-label="Página anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          {/* Botão Próximo */}
          <button
            onClick={irParaProximo}
            disabled={paginaAtual >= totalPaginas - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
            style={{
              backgroundImage: 'url("/Background.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            aria-label="Próxima página"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        </div>

        {/* Indicadores de Página */}
        {totalPaginas > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPaginas }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPaginaAtual(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  index === paginaAtual
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir para página ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
