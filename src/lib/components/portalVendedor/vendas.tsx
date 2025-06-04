"use client"
import type React from "react"
import { useState } from "react"
import { Loader, CheckCircle, Clock, CreditCard, User, Phone, DollarSign, ShoppingBag  } from "lucide-react"

interface Venda {
  id: number
  compradorId: number
  valor: string
  metodoPagamento: string
  status: string
  enderecoId: number
  criadoEm: string
  atualizadoEm: string
  remetenteNome: string
  remetenteDoc: string
  produtoId: number
  produto: {nome: string}
}

interface VendasProps {
  isLoading: boolean
  error: any
  vendas: Venda[]
  atualizaStatusCompra: (status: string , vendaId: number) => void
}

const Vendas: React.FC<VendasProps> = ({ isLoading, error, vendas, atualizaStatusCompra }) => {
  const [abaAtiva, setAbaAtiva] = useState<"pendente" | "aprovada">("pendente")

  // Filtrar vendas por status
  const vendasPendentes = vendas.filter((venda) => venda.status === "pendente")
  const vendasAprovadas = vendas.filter((venda) => venda.status === "aprovado")

  // Calcular média do lucro das vendas aprovadas
  const calcularMediaLucro = () => {
    if (vendasAprovadas.length === 0) return "0"
    const totalLucro = vendasAprovadas.reduce((acc, venda) => acc + Number.parseFloat(venda.valor), 0)
    return (totalLucro / vendasAprovadas.length).toFixed(2)
  }

  // Calcular total das vendas aprovadas
  const calcularTotalVendas = () => {
    return vendasAprovadas.reduce((acc, venda) => acc + Number.parseFloat(venda.valor), 0).toFixed(2)
  }

  const formatarMetodoPagamento = (metodo: string) => {
    const metodos: { [key: string]: string } = {
      pix: "PIX",
      cartao: "Cartão",
      boleto: "Boleto",
      dinheiro: "Dinheiro",
    }
    return metodos[metodo] || metodo
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <Loader className="h-10 w-10 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Carregando vendas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-2">Erro ao carregar vendas</p>
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

  return (
    <div className="h-full flex flex-col">
      {/* Header com título e estatísticas */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Minhas Vendas</h2>

        {vendasAprovadas.length > 0 && (
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">Média por venda:</span>
              <span className="font-medium text-green-600">R$ {calcularMediaLucro().replace(".", ",")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Total faturado:</span>
              <span className="font-medium text-green-600">R$ {calcularTotalVendas().replace(".", ",")}</span>
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
            <span>Pendentes ({vendasPendentes.length})</span>
          </div>
        </button>
        <button
          onClick={() => setAbaAtiva("aprovada")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            abaAtiva === "aprovada"
              ? "text-green-600 border-b-2 border-green-600 bg-green-50"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Aprovadas ({vendasAprovadas.length})</span>
          </div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {abaAtiva === "pendente" && (
          <div className="space-y-4">
            {vendasPendentes.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma venda pendente</h3>
                <p className="text-gray-500">Vendas aguardando aprovação aparecerão aqui.</p>
              </div>
            ) : (
              vendasPendentes.map((venda) => (
                <div key={venda.id} className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-orange-800">Venda Pendente</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(venda.criadoEm).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                        
                      <div className="flex items-center space-x-2">
                        <ShoppingBag  className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Produto:</span>
                        <span className="font-medium">{venda.produto.nome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Comprador:</span>
                        <span className="font-medium">{venda.remetenteNome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Contato:</span>
                        <span className="font-medium">{venda.remetenteDoc}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Valor:</span>
                        <span className="font-medium text-green-600">
                          R$ {Number.parseFloat(venda.valor).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Pagamento:</span>
                        <span className="font-medium">{formatarMetodoPagamento(venda.metodoPagamento)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => atualizaStatusCompra("aprovado", venda.id)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Aprovar Venda
                    </button>
                    <button
                      onClick={() => atualizaStatusCompra("falhou", venda.id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Rejeitar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {abaAtiva === "aprovada" && (
          <div className="space-y-4">
            {vendasAprovadas.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma venda aprovada</h3>
                <p className="text-gray-500">Vendas aprovadas aparecerão aqui.</p>
              </div>
            ) : (
              vendasAprovadas.map((venda) => (
                <div key={venda.id} className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Venda Aprovada</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(venda.atualizadoEm).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <ShoppingBag  className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Produto:</span>
                        <span className="font-medium">{venda.produto.nome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Comprador:</span>
                        <span className="font-medium">{venda.remetenteNome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Contato:</span>
                        <span className="font-medium">{venda.remetenteDoc}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Valor:</span>
                        <span className="font-medium text-green-600">
                          R$ {Number.parseFloat(venda.valor).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Pagamento:</span>
                        <span className="font-medium">{formatarMetodoPagamento(venda.metodoPagamento)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Vendas
