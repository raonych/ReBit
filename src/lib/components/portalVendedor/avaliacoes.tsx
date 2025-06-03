"use client"
import type React from "react"
import { Loader, Star, MessageCircle, Calendar, User } from "lucide-react"

interface Avaliacao {
  id: number
  avaliadorId: number
  avaliadoId: number
  nota: number
  comentario: string
  criadoEm: string
  avaliador: {nome: string}
}

interface VendasProps {
  isLoading: boolean
  error: any
  avaliacoes: Avaliacao[]
}

const Avaliacoes: React.FC<VendasProps> = ({ isLoading, error, avaliacoes }) => {
  // Calcular média das notas
  const calcularMediaNotas = () => {
    if (avaliacoes.length === 0) return "0"
    const soma = avaliacoes.reduce((acc, avaliacao) => acc + avaliacao.nota, 0)
    return (soma / avaliacoes.length).toFixed(1)
  }

  // Renderizar estrelas
  const renderEstrelas = (nota: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(nota)
            ? "text-yellow-400 fill-current"
            : index < nota
              ? "text-yellow-400 fill-current opacity-50"
              : "text-gray-300"
        }`}
      />
    ))
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <Loader className="h-10 w-10 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Carregando avaliações...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-2">Erro ao carregar avaliações</p>
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

  const mediaNotas = calcularMediaNotas()
  const quantidadeAvaliacoes = avaliacoes.length

  return (
    <div className="h-full flex flex-col">
      {/* Header com título e estatísticas */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Minhas Vendas</h2>

        {quantidadeAvaliacoes > 0 ? (
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">{renderEstrelas(Number.parseFloat(mediaNotas))}</div>
              <span className="font-medium text-gray-700">{mediaNotas}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <MessageCircle className="w-4 h-4" />
              <span>
                {quantidadeAvaliacoes} {quantidadeAvaliacoes === 1 ? "avaliação" : "avaliações"}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Nenhuma avaliação ainda</p>
        )}
      </div>

      {/* Conteúdo das avaliações */}
      <div className="flex-1 overflow-y-auto p-6">
        {avaliacoes.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <Star className="w-12 h-12 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma avaliação ainda</h3>
            <p className="text-gray-500">Suas avaliações de vendas aparecerão aqui quando você começar a vender.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {avaliacoes.map((avaliacao) => (
              <div
                key={avaliacao.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">{renderEstrelas(avaliacao.nota)}</div>
                    <span className="font-medium text-gray-700">{avaliacao.nota}/5</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(avaliacao.criadoEm).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                {avaliacao.comentario && (
                  <div className="mb-3">
                    <p className="text-gray-700 leading-relaxed">"{avaliacao.comentario}"</p>
                  </div>
                )}

                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>Avaliador: {avaliacao.avaliador.nome}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Avaliacoes
