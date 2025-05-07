"use client";

import { useEffect, useState } from "react";
import ProdutoDiv from "@/lib/components/produtoDiv";
import { produtoService } from "@/lib/request/produto";
import { Search } from "lucide-react";

export default function Home() {
  const [produtos, setProdutos] = useState<any[]>([]);
  
  useEffect(() => {
    const buscarProdutos = async () => {
        const produtos = await produtoService.todosProdutos();
        setProdutos(produtos);
    };
    buscarProdutos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      <main className="flex-1">
        <div className="m-18 max-w-7xl mx-auto">
          <form className="flex flex-row flex-wrap">
            <div>
              <input
                id="pesquisar" 
                name="pesquisar" 
                type="text"
                className="p-1 text-lg font-semibold outline-1 rounded-xl transition duration-300 focus:bg-gray-200"
                placeholder="Pesquisar"
              />
            </div>
            
            <div>
              <select
                name="ordem_prod"
                id="ordem_prod"
                className="p-1 text-lg font-semibold outline-1 rounded-xl"
              >
                <option value="Recentes">Recentes</option>
                <option value="Recentes">Mais caro</option>
                <option value="Recentes">Mais barato</option>
              </select>
            </div>

            <div>
              <select
                name="estado_prod" 
                id="estado_prod"
                className="p-1 text-lg font-semibold outline-1 rounded-xl"
              >
                <option value="Recentes">Todos</option>
                <option value="Recentes">Usados</option>
                <option value="Recentes">Quebrados</option>
              </select>
            </div>

            <div>
              <select
                name="categoria_prod"
                id="categoria_prod"
                className="p-1 text-lg font-semibold outline-1 rounded-xl"
              >
                <option value="Recentes">Todos</option>
                <option value="Recentes">Celulares</option>
                <option value="Recentes">Placas de vídeo</option>
              </select>
            </div>
          </form>
        </div>
        <div className="m-18 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <ProdutoDiv
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                cidade={produto.cidade || "Local não informado"}
                data={produto.data || "Data desconhecida"}
                imagemUrl={"/placeholder.png"}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
