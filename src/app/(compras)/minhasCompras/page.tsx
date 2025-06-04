"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Loader,
  Clock,
  CheckCircle,
  Package,
  User,
  Phone,
  CreditCard,
  DollarSign,
  X,
  MessageCircle,
  Star,
} from "lucide-react"
import { usuarioService } from "@/lib/request/usuarios"
import { conversaService } from "@/lib/request/conversas"
import Link from "next/link"

const MinhasComprasWrapper: React.FC = () => {
  const [compras, setCompras] = useState<any[]>([])
  const [error, setError] = useState<{ status: number; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const buscarCompras = async () => {
      try {
        setIsLoading(true)
        const minhasCompras = await usuarioService.exibirMinhasCompras()
        setCompras(minhasCompras)
        setError(null)
      } catch (err: any) {
        setError({ status: err.status || 500, message: err.message || "Erro ao carregar compras" })
        setCompras([])
      } finally {
        setIsLoading(false)
      }
    }

    buscarCompras()
  }, [])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <Loader className="h-10 w-10 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Carregando compras...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-2">Erro ao carregar compras</p>
          <p className="text-gray-600">{error.message}</p>
          <button
            onClick={() => location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  if(compras.length > 0 && compras != undefined){
    
    return <MinhasCompras comprasProp={compras} />

  }

  return (
    <div className="max-h-screen flex flex-col">
      <div className="h-full flex flex-col items-center justify-center py-20 text-center px-6">
        <p className="text-gray-600 text-lg mb-4">Você ainda não comprou nenhum produto.</p>
        <Link
          href="/produtos"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Explorar produtos
        </Link>
      </div>
      </div>
    )

}


interface ComprasProps {
  comprasProp: any[]
}

const MinhasCompras: React.FC<ComprasProps> = ({comprasProp}) => {

  const router = useRouter()
  const [abaAtiva, setAbaAtiva] = useState<"pendente" | "aprovado">("pendente")  

  const [compras, setCompras] = useState<any[]>([])
  const [modalAberto, setModalAberto] = useState(false)
  const [vendedorAvaliado, setVendedorAvaliado] = useState<{ id: string; nome: string }>({ id: "", nome: "" })
  const [produtoAvaliado, setProdutoAvaliado ] = useState<string | null>();
  const [nota, setNota] = useState<number>(5)
  const [comentario, setComentario] = useState<string>("")
  const [enviandoAvaliacao, setEnviandoAvaliacao] = useState(false)

  const onContatarVendedor = async (produtoId: string) => {
    const chat = await conversaService.iniciarConversa(produtoId)
    if (chat) {
      router.push(`/conversas/${chat.conversa.id}`)
    }
  }

  useEffect(()=>{

    setCompras(comprasProp)

  },[comprasProp])

  // Filtrar compras por status
  const comprasPendentes = compras.filter((compra) => compra.status === "pendente")
  const comprasAprovadas = compras.filter((compra) => compra.status === "aprovado")

  // Calcular total gasto
  const calcularTotalGasto = () => {
    return compras.reduce((acc, compra) => acc + Number.parseFloat(compra.valor), 0).toFixed(2)
  }

  // Calcular total de compras aprovadas
  const calcularTotalAprovadas = () => {
    return comprasAprovadas.reduce((acc, compra) => acc + Number.parseFloat(compra.valor), 0).toFixed(2)
  }

  const formatarMetodoPagamento = (metodo: string) => {
    const metodos: { [key: string]: string } = {
      pix: "PIX",
      cartao_credito: "Cartão de Crédito",
      cartao_debito: "Cartão de Débito",
      boleto: "Boleto",
      dinheiro: "Dinheiro",
    }
    return metodos[metodo] || metodo
  }

  const formatarCondicao = (condicao: string) => {
    const condicoes: { [key: string]: string } = {
      novo: "Novo",
      usado: "Usado",
      danificado: "Danificado",
    }
    return condicoes[condicao] || condicao
  }

  const handleCancelarCompra = async (compraId: number) => {
    try {
      // Atualizar lista local removendo a compra cancelada
      setCompras(compras.filter((compra) => compra.id !== compraId))
    } catch (error) {
      console.error("Erro ao cancelar compra:", error)  
    }
  }

  const avaliaVendedor = (produtoId: string) => {
    const compra = compras.find((c) => c.produtoId === produtoId)
    if (compra) {
      setVendedorAvaliado({
        id: compra.produto.vendedor.id,
        nome: compra.produto.vendedor.nome,
      })
      setProdutoAvaliado(produtoId)
      setModalAberto(true)
      setNota(5) 
      setComentario("")
    }
  }

  const enviarAvaliacao = async () => {
    try {
      setEnviandoAvaliacao(true)

      const dados = {
        avaliadoId: vendedorAvaliado.id,
        produtoId: produtoAvaliado,
        comentario,
        nota
      }

      console.log(dados)
      await usuarioService.enviarAvaliacao(dados);

      setModalAberto(false)
      alert("Avaliação enviada com sucesso!")

    } catch (error) {
      console.error("Erro ao enviar avaliação:", error)
      alert("Erro ao enviar avaliação. Tente novamente.")
    } finally {
      setEnviandoAvaliacao(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm mx-25">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Minhas Compras</h1>

        {compras.length > 0 && (
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="text-gray-600">Total gasto:</span>
              <span className="font-medium text-blue-600">R$ {calcularTotalGasto().replace(".", ",")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Compras aprovadas:</span>
              <span className="font-medium text-green-600">R$ {calcularTotalAprovadas().replace(".", ",")}</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setAbaAtiva("pendente")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            abaAtiva === "pendente"
              ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Pendentes ({comprasPendentes.length})</span>
          </div>
        </button>
        <button
          onClick={() => setAbaAtiva("aprovado")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            abaAtiva === "aprovado"
              ? "text-green-600 border-b-2 border-green-600 bg-green-50"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Aprovadas ({comprasAprovadas.length})</span>
          </div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {abaAtiva === "pendente" && (
          <div className="space-y-4">
            {comprasPendentes.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma compra pendente</h3>
                <p className="text-gray-500">Compras aguardando aprovação do vendedor aparecerão aqui.</p>
              </div>
            ) : (
              comprasPendentes.map((compra) => (
                <div key={compra.id} className="p-4 border border-orange-200 rounded-lg ">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-orange-800">Aguardando Aprovação</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(compra.criadoEm).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{compra.produto.nome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Categoria:</span>
                        <span className="text-sm font-medium">{compra.produto.categoria.nome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Condição:</span>
                        <span className="text-sm font-medium">{formatarCondicao(compra.produto.condicao)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Vendedor:</span>
                        <span className="font-medium">{compra.produto.vendedor.nome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Valor:</span>
                        <span className="font-medium text-green-600">
                          R$ {Number.parseFloat(compra.valor).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Pagamento:</span>
                        <span className="font-medium">{formatarMetodoPagamento(compra.metodoPagamento)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => onContatarVendedor(compra.produtoId)}
                      className="flex-1 px-4 py-2 border border-green-700 text-green-500 hover:bg-green-50 font-semibold py-3 rounded-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Contatar Vendedor</span>
                    </button>
                    <button
                      onClick={() => handleCancelarCompra(compra.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {abaAtiva === "aprovado" && (
          <div className="space-y-4">
            {comprasAprovadas.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma compra aprovada</h3>
                <p className="text-gray-500">Compras aprovadas aparecerão aqui.</p>
              </div>
            ) : (
              comprasAprovadas.map((compra) => (
                <div key={compra.id} className="p-4 border border-green-200 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Compra Aprovada</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Aprovada em: {new Date(compra.atualizadoEm).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{compra.produto.nome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Categoria:</span>
                        <span className="text-sm font-medium">{compra.produto.categoria.nome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Condição:</span>
                        <span className="text-sm font-medium">{formatarCondicao(compra.produto.condicao)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Vendedor:</span>
                        <span className="font-medium">{compra.produto.vendedor.nome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Contato:</span>
                        <span className="font-medium">{compra.produto.vendedor.telefone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Valor:</span>
                        <span className="font-medium text-green-600">
                          R$ {Number.parseFloat(compra.valor).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Pagamento:</span>
                        <span className="font-medium">{formatarMetodoPagamento(compra.metodoPagamento)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div>
                      <button
                        onClick={() => avaliaVendedor(compra.produtoId)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer"
                      >
                        <Star className="w-4 h-4" />
                        <span>Avaliar Vendedor</span>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => onContatarVendedor(compra.produtoId)}
                        className="px-4 py-2 border border-green-700 text-green-500 hover:bg-green-50 rounded-md transition-colors flex items-center space-x-2 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Contatar Vendedor</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Avaliar Vendedor: {vendedorAvaliado.nome}</h3>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nota</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <button key={estrela} type="button" onClick={() => setNota(estrela)} className="focus:outline-none">
                      <Star
                        className={`w-8 h-8 ${estrela <= nota ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-gray-700 font-medium">{nota}/5</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="comentario" className="block text-sm font-medium text-gray-700">
                  Comentário
                </label>
                <textarea
                  id="comentario"
                  rows={4}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Compartilhe sua experiência com este vendedor..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={enviarAvaliacao}
                disabled={enviandoAvaliacao}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center space-x-2"
              >
                {enviandoAvaliacao ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4" />
                    <span>Enviar Avaliação</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MinhasComprasWrapper