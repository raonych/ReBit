"use client";

import { useEffect, useState } from "react";
import ProdutoDiv from "@/lib/components/produtoDiv";
import SelectPersonalizado from "@/lib/components/selectPersonalizado";
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

  const estadoProduto = ['Todos','Quebrado','Novo'];
  const categoriaProduto = ['Todos','Celulares','Placa de vídeo'];
  const ordemProduto = ['Recentes','Mais caro','Mais barato'];

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      <main className="flex-1">
        <div className="m-11 max-w-7xl mx-auto">
          <form className="flex flex-row flex-wrap gap-7 shadow-sm rounded-xl p-5">
            <div className="flex items-center gap-2 p-2 text-lg font-semibold shadow-sm rounded-xl ">
              <Search size={17}/>
              <input
                id="pesquisar"  
                name="pesquisar" 
                type="text"
                className="transition duration-300 focus:outline-0"
                placeholder="Pesquisar"
              />
            </div>
            
            <SelectPersonalizado opcoes={ordemProduto}/>
            <SelectPersonalizado opcoes={estadoProduto}/>
            <SelectPersonalizado opcoes={categoriaProduto}/>

            <button type="submit" className="p-2 px-5 text-lg float-end font-bold text-white shadow-sm rounded-xl bg-green-800">
              Filtrar
            </button>

          </form> 
        </div>
        <div className="m-18 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <ProdutoDiv
                key={produto.id}
                id={produto.id}
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
