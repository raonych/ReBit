"use client";

import { useEffect, useState } from "react";
import ProdutoDiv from "@/lib/components/produtoDiv";
import SelectPersonalizado from "@/lib/components/selectPersonalizado";
import { produtoService } from "@/lib/request/produto";
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader, Search } from "lucide-react";
import { categoriaService } from "@/lib/request/categorias";

export default function Produtos() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const busca = searchParams?.get('busca') || null;
  const categoria = searchParams?.get('categoria') || null;
  const condicao = searchParams?.get('condicao') || null;
  const [categoriaProduto, setCategoriaProduto]= useState<any[]>([]); 
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [produtos, setProdutos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
        const response = await produtoService.todosProdutosComFiltro(busca, categoria, condicao);
        setProdutos(response.produtos);
        const categorias = await categoriaService.categorias();
        const nomesCategorias = categorias.categorias.map((categoria: { nome: any; }) => categoria.nome)
        setCategoriaProduto(["Todos", ...nomesCategorias]);
        setIsLoading(false);
    };
    fetchData();
  }, [busca, categoria, condicao]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const query = new URLSearchParams();
   
    const termo = (e.target as any).pesquisar.value;
    if (termo) query.set("busca", termo);
    if (categoriaSelecionada && categoriaSelecionada !== 'Todos') {
      query.set("categoria", categoriaSelecionada);
    }
    if (estadoSelecionado && estadoSelecionado !== 'Todos') {
      query.set("condicao", estadoSelecionado);
    } 
    router.push("produtos/?" + query.toString()); 
  };

  const estadoProduto = ['Todos','Danificado','Novo','Usado'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className='animate-spin mx-auto'/>
      </div>
    );
  }

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
            <SelectPersonalizado 
              onChange={setEstadoSelecionado}
              opcoes={estadoProduto}/>
            <SelectPersonalizado 
              onChange={setCategoriaSelecionada} 
              opcoes={categoriaProduto}/>

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
                imagemUrl={produto.fotos[0].url}
                jaFavoritado={produto.favoritos.length > 0 }
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
