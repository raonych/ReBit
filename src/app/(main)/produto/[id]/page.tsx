"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ShoppingCart, MessageCircleMore, Loader2, Star, Heart, ArrowLeft, MapPin, Phone, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { produtoService } from "@/lib/request/produto"
import { conversaService } from "@/lib/request/conversas"
import { usuarioService } from "@/lib/request/usuarios"

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  )
}

const PaginaProduto: React.FC = () => {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [produto, setProduto] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [headingTo, setHeadingTo] = useState(false)
  const [fotos, setFotos] = useState<{ id: number; produtoId: number; url: string }[]>([])
  const [favoritado, setFavoritado] = useState(false)
  const [loadingFavorito, setLoadingFavorito] = useState(false)
  const [fotoAtual, setFotoAtual] = useState(0)

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        const dados = await produtoService.produtoUnico(id)
        setProduto(dados)
        setFotos(dados.fotos)
        if (dados.favoritos.length > 0) {
          setFavoritado(true)
        }
      } catch (erro) {
        console.error("Erro ao carregar produto", erro)
      } finally {
        setLoading(false)
      }
    }
    buscarProduto()
  }, [id])

  const handleChat = async () => {
    try{
      await usuarioService.exibirPerfil(); 
    }catch(error: any){
      if(error.status == 401)
      router.push("/login");
      console.error(error);
    }
    
    const chat = await conversaService.iniciarConversa(id)
    if (chat) {
      router.push(`/conversas/${chat.conversa.id}`)
    }
  }

  const toggleFavorito = async () => {
    setLoadingFavorito(true)
    const sucesso = await produtoService.favoritarProduto(produto.id, favoritado)
    if (sucesso) {
      setFavoritado(!favoritado)
    }
    setLoadingFavorito(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-lg h-96 md:h-[500px]" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-md h-16 w-16" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-12 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded" />
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!produto) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h1>
          <p className="text-gray-600 mb-4">O produto que você está procurando não existe.</p>
          <Link href="/produtos" className="text-green-600 hover:text-green-700 font-medium">
            Voltar para produtos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/produtos" className="flex items-center text-gray-600 mb-6 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para produtos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Galeria de imagens */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={fotos[fotoAtual]?.url || "/placeholder.svg"}
                  alt={produto.nome}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
                <button
                  onClick={toggleFavorito}
                  disabled={loadingFavorito}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
                >
                  {loadingFavorito ? (
                    <Loader2 size={20} className="animate-spin text-gray-500" />
                  ) : (
                    <Heart size={20} className={favoritado ? "text-red-500 fill-red-500" : "text-gray-500"} />
                  )}
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {fotos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {fotos.map((foto, index) => (
                  <button
                    key={foto.id}
                    onClick={() => setFotoAtual(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      index === fotoAtual ? "border-green-600" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={foto.url || "/placeholder.svg"}
                      alt={`${produto.nome} - ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do produto */}
          <div className="space-y-6">
            {/* Preço e ações */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{produto.nome}</h1>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/confirmarCompra/${id}`}
                    onClick={() => setHeadingTo(true)}
                    className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                  >
                    {headingTo ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Comprar agora
                      </>
                    )}
                  </Link>

                  <button
                    onClick={handleChat}
                    className="w-full flex items-center justify-center gap-2 border border-green-700 text-green-700 hover:bg-green-50 font-semibold py-3 px-4 rounded-md transition-colors"
                  >
                    <MessageCircleMore className="w-5 h-5" />
                    Conversar com vendedor
                  </button>
                </div>
              </div>
            </div>

            {/* Informações do vendedor */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium flex items-center">
                  <User className="h-5 w-5 mr-2 text-gray-600" />
                  Vendedor
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{produto.vendedor.nome}</h3>
                    <div className="mt-1">
                      <StarRating rating={produto.vendedor.notaVendedor || 0} />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>
                        {produto.vendedor.enderecos[0]?.cidade || "Não especificado"},{" "}
                        {produto.vendedor.enderecos[0]?.UF || ""}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{produto.vendedor.telefone || "Não especificado"}</span>
                    </div>
                  </div>

                  <Link
                    href={`/perfilVendedor/${produto.vendedorId}`}
                    className="inline-flex items-center text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Ver perfil completo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">Descrição do produto</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{produto.descricao}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaginaProduto
