"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Loader, Edit, Trash2, MapPin, Calendar} from "lucide-react"
import { usuarioService } from "@/lib/request/usuarios"
import Image from "next/image"
import Link from "next/link"
import { produtoService } from "@/lib/request/produto"

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<{ status: number; message: string } | null>(null)

  useEffect(() => {
    const exibeMeusProdutos = async () => {
      try {
        const meusProdutos = await usuarioService.exibirMeusProdutos()
        setProdutos(meusProdutos)
      } catch (err: any) {
        setError({ status: err.status, message: err.message })
      } finally {
        setIsLoading(false)
      }
    }

    exibeMeusProdutos()
  }, [])

  const handleAtualizar = (produtoId: string) => {
    console.log("Atualizar produto:", produtoId)
  }

  const handleExcluir = async (produtoId: string) => {
    console.log("Excluir produto:", produtoId)
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProdutos(produtos.filter((produto) => produto.id !== produtoId))
      await produtoService.ExcluirProduto(produtoId);
    }
  }

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
    )
  }

  if (error?.status === 404) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 w-full lg:w-1/2 flex-grow">
        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
          <p className="text-gray-600 text-lg mb-4">Você ainda não anunciou nenhum produto.</p>
          <Link href="/cadastroProduto" className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Começar a vender
          </Link>
        </div>
      </div>
    )
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
    )
  }

  return (
    <div className="w-full lg:w-1/2 flex-grow">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Meus Produtos</h2>

          <div className="space-y-4">
            {produtos.map((produto, index) => (
              <div
                key={produto?.id || index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={produto.fotos?.[0]?.url || "/placeholder.svg?height=64&width=64"}
                      alt={produto.nome}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{produto.nome}</h3>
                    <p className="text-xl font-bold text-green-600 mt-1">
                      R$ {parseFloat(produto.preco).toFixed(2).replace(".", ",")}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{produto.vendedor?.enderecos?.[0]?.cidade || "Desconhecida"}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(produto.criadoEm).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4 gap-5">
                  <button
                    onClick={() => handleAtualizar(produto.id)}
                    className="flex items-center space-x-1 cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">Atualizar</span>
                  </button>
                  <button
                    onClick={() => handleExcluir(produto.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:border-red-300 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Excluir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {produtos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum produto encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Produtos
