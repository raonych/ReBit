"use client";

import { useEffect, useState } from "react";
import ProdutoDiv from "@/lib/components/produtoDiv";
import SelectPersonalizado from "@/lib/components/selectPersonalizado";
import { produtoService } from "@/lib/request/produto";
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const busca = searchParams?.get('busca') || null;
  const categoria = searchParams?.get('categoria') || null;
  const condicao = searchParams?.get('condicao') || null;
  const [produtos, setProdutos] = useState<any[]>([]);
  
  useEffect(() => {


    const buscarProdutos = async () => {
        const response = await produtoService.todosProdutosComFiltro(busca, categoria, condicao);
        setProdutos(response.produtos);
    };
    buscarProdutos();
  }, [busca, categoria, condicao]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const query = new URLSearchParams();
  
    const termo = (e.target as any).pesquisar.value;
    if (termo) query.set("busca", termo);
    
  
    router.push("produtos/?" + query.toString());
  };

  const estadoProduto = ['Todos','Quebrado','Novo'];
  const categoriaProduto = ['Todos','Celulares','Placa de vídeo'];
  const ordemProduto = ['Recentes','Mais caro','Mais barato'];

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      <main className="flex-1">
        <div className="m-11 max-w-7xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-row flex-wrap gap-7 shadow-sm rounded-xl p-5">
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
                cidade={produto.vendedor.enderecos[0].cidade+", "+ produto.vendedor.enderecos[0].UF || "Local não informado"}
                data={new Date(produto.criadoEm).toLocaleDateString('pt-BR') || "Data desconhecida"}
                imagemUrl={"/placeholder.png"}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
