"use client"

import type React from "react"

import { useEffect, useState } from "react"
import ProdutoDiv from "@/lib/components/produtoDiv"
import SelectPersonalizado from "@/lib/components/selectPersonalizado"
import { produtoService } from "@/lib/request/produto"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader, Search, Filter, Package } from "lucide-react"
import { categoriaService } from "@/lib/request/categorias"

export default function Produtos() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const busca = searchParams?.get("busca") || null
  const categoria = searchParams?.get("categoria") || null
  const condicao = searchParams?.get("condicao") || null
  const [categoriaProduto, setCategoriaProduto] = useState<any[]>([])
  const [estadoSelecionado, setEstadoSelecionado] = useState("")
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("")
  const [produtos, setProdutos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [termoBusca, setTermoBusca] = useState(busca || "")

  useEffect(() => {
    const fetchData = async () => {
       try {
        const response = await produtoService.todosProdutosComFiltro(busca, categoria, condicao)
        setProdutos(response.produtos)

        const categorias = await categoriaService.categorias()
        const nomesCategorias = categorias.categorias.map((categoria: { nome: any }) => categoria.nome)
        setCategoriaProduto(["Todos", ...nomesCategorias])
      } catch (err: any) {
        if (err.status === 404) {
          return
        }
        console.error("Erro ao buscar dados:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [busca, categoria, condicao])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const query = new URLSearchParams()

    if (termoBusca.trim()) query.set("busca", termoBusca.trim())
    if (categoriaSelecionada && categoriaSelecionada !== "Todos") {
      query.set("categoria", categoriaSelecionada)
    }
    if (estadoSelecionado && estadoSelecionado !== "Todos") {
      query.set("condicao", estadoSelecionado)
    }

    router.push("/produtos?" + query.toString())
  }

  const limparFiltros = () => {
    setTermoBusca("")
    setEstadoSelecionado("")
    setCategoriaSelecionada("")
    router.push("/produtos")
  }

  const estadoProduto = ["Todos", "Danificado", "Seminovo", "Usado"]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 h-8 w-8 text-gray-600" />
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Package className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            Produtos
          </h1>
          <p className="text-gray-600">Encontre os melhores produtos para você</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium flex items-center">
              <Filter className="h-5 w-5 mr-2 text-gray-600" />
              Filtros
            </h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Campo de busca */}
                <div className="lg:col-span-2">
                  <label htmlFor="pesquisar" className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar produtos
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="pesquisar"
                      name="pesquisar"
                      type="text"
                      value={termoBusca}
                      onChange={(e) => setTermoBusca(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Digite o nome do produto..."
                    />
                  </div>
                </div>

                {/* Condição */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condição</label>
                  <SelectPersonalizado
                    onChange={setEstadoSelecionado}
                    opcoes={estadoProduto}
                  />
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <SelectPersonalizado
                    onChange={setCategoriaSelecionada}
                    opcoes={categoriaProduto}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-2 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md transition-colors"
                >
                  Aplicar filtros
                </button>
                <button
                  type="button"
                  onClick={limparFiltros}
                  className="flex-1 sm:flex-none px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-md transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-gray-600">
            {produtos.length} produto{produtos.length !== 1 ? "s" : ""} encontrado{produtos.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid de produtos */}
        {produtos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
            {produtos.map((produto) => (
              <ProdutoDiv
                key={produto.id}
                id={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                cidade={
                  produto.vendedor.enderecos[0]?.cidade + ", " + produto.vendedor.enderecos[0]?.UF ||
                  "Local não informado"
                }
                data={new Date(produto.criadoEm).toLocaleDateString("pt-BR") || "Data desconhecida"}
                imagemUrl={produto.fotos[0]?.url}
                jaFavoritado={produto.favoritos.length > 0}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mb-6">Tente ajustar os filtros ou fazer uma nova busca.</p>
            <button
              onClick={limparFiltros}
              className="px-6 py-2 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md transition-colors"
            >
              Ver todos os produtos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
