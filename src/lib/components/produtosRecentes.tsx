"use client";
import { useState, useEffect } from "react";
import { produtoService } from "@/lib/request/produto";
import ProdutoDiv from "@/lib/components/produtoDiv";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PRODUTOS_POR_PAGINA = 4;

export default function ProdutosRecentes() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const exibeRecentes = async () => {
      try {
        const produtos = await produtoService.produtosRecentes();
        setProdutos(produtos);
        console.log(produtos);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };
    exibeRecentes();
  }, []);

  const totalPaginas = Math.ceil(produtos.length / PRODUTOS_POR_PAGINA);

  const irParaAnterior = () => {
    setPaginaAtual((prev) => Math.max(prev - 1, 0));
  };

  const irParaProximo = () => {
    setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas - 1));
  };

  const produtosExibidos = produtos.slice(
    paginaAtual * PRODUTOS_POR_PAGINA,
    (paginaAtual + 1) * PRODUTOS_POR_PAGINA
  );

  const skeletons = Array.from({ length: PRODUTOS_POR_PAGINA });

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
      <div className="w-xs max-w-l mx-auto relative">
        <h2 className="text-3xl font-bold mb-8">Produtos em destaque</h2>

        <div className="flex gap-2 justify-center items-center">
          <button
            onClick={irParaAnterior}
            disabled={paginaAtual === 0}
            className="p-2 bg-white rounded-full shadow disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-3">
            {(loading ? skeletons : produtosExibidos).map((item, index) => (
              <div key={item?.id || index} className="flex-shrink-0">
                {loading ? (
                  <div className="w-74">
                    <Skeleton height={192} />
                    <div className="p-4">
                      <Skeleton width={80} height={24} className="mb-2" />
                      <Skeleton width={120} height={20} className="mb-2" />
                      <Skeleton width={60} height={16} className="mb-1" />
                      <Skeleton width={80} height={16} />
                    </div>
                  </div>
                ) : (
                  <ProdutoDiv
                    id={item.id}
                    nome={item.nome}
                    preco={item.preco}
                    cidade={item.vendedor.enderecos[0].cidade || "Desconhecida"}
                    data={new Date(item.criadoEm).toLocaleDateString("pt-BR")}
                    imagemUrl={item.fotos[0].url || "/placeholder.png"}
                    jaFavoritado={item.favoritos.length > 0}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={irParaProximo}
            disabled={paginaAtual >= totalPaginas - 1}
            className="p-2 bg-white rounded-full shadow disabled:opacity-30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>  
  );
}
