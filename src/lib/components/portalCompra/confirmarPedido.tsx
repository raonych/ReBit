"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, User, Package, ChevronRight, Edit2, Check, ArrowLeft, Loader } from "lucide-react"
import { useParams } from "next/navigation"
import { produtoService } from "@/lib/request/produto"
import { usuarioService } from "@/lib/request/usuarios"


type PedidoProps = {
  id: string;
  handleConfirm: () => void;
  handleForm:(dados: {
    enderecoId: string | null;
    nomeRecebedor: string;
    documentoRecebedor: string;
  }) => void;
};

const ConfirmarPedido = ({id, handleConfirm, handleForm} : PedidoProps) => {

  const [loading, setLoading] = useState(true);
  const [produto, setProduto] = useState<any>(null);
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [enderecoId, setEnderecoId] = useState<string | null>(null); 
  const [recebedor, setRecebedor] = useState("proprio")
  const [nomeRecebedor, setNomeRecebedor] = useState("")
  const [documentoRecebedor, setDocumentoRecebedor] = useState("")
  const [editandoRecebedor, setEditandoRecebedor] = useState(false)
  const [foto, setFoto] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const produtoData = await produtoService.produtoUnico(id);
      const enderecosData = await usuarioService.exibirEnderecos();

      if (enderecosData.length > 0) {
        setEnderecos(enderecosData);
        setEnderecoId(enderecosData[0].key); 
      } else {
        setEnderecos([]);
        setEnderecoId(null); 
      }
  
      setFoto(produtoData.fotos[0].url);
      setProduto(produtoData);  
      setLoading(false);
    };
    if(loading){
      fetchData();
    }
    
  }, [id, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className="animate-spin mx-auto" />
      </div>
    )
  }

  const frete = 25.9;
  const total = parseFloat(produto?.preco) + frete;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href={`/produto/${id}`} className="flex items-center text-gray-600 mb-6 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para o produto
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">Confirmar dados do pedido</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna principal com endereço e recebedor */}
          <div className="md:col-span-2 space-y-6">
            {/* Seção de produto */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium flex items-center">
                  <Package className="h-5 w-5 mr-2 text-gray-600" />
                  Produto
                </h2>
              </div>
              <div className="p-4">
                <div className="flex items-center">
                  <div className="h-20 w-20 relative rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src={foto || "/placeholder.svg"}
                      alt={produto?.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{produto?.nome}</h3>
                    <p className="text-sm text-gray-500">Vendido por: {produto?.vendedor.nome}</p>
                    <p className="font-medium mt-1">R$ {parseFloat(produto?.preco).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de endereço de entrega */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                  Endereço de entrega
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {enderecos.length > 0 ? (
                    enderecos.map((endereco, key) => (
                      <div
                        key={key}
                        className="flex items-start space-x-3 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center h-5">
                          <input
                          required
                            type="radio"
                            id={`endereco-${endereco.id}`}
                            name="endereco"
                            value={endereco.id}
                            checked={enderecoId === String(endereco.id)}
                            onChange={() => setEnderecoId(String(endereco.id))}
                            className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mt-1">
                            {endereco?.rua}, {endereco?.complemento}
                            <br />
                            {endereco?.bairro} - {endereco?.cidade}/{endereco?.estado}
                            <br />
                            CEP: {endereco?.cep}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mt-1">
                        Você ainda não possui nenhum endereço cadastrado
                      </p>
                    </div>
                  )}
                </div>

                <Link  href={"/enderecos"} className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center hover:bg-gray-50 transition-colors">
                  <MapPin className="h-4 w-4 mr-2" />
                  Adicionar novo endereço
                </Link>
              </div>
            </div>

            {/* Seção de quem receberá */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium flex items-center">
                  <User className="h-5 w-5 mr-2 text-gray-600" />
                  Quem receberá o pedido
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        id="recebedor-proprio"
                        name="recebedor"
                        value="proprio"
                        checked={recebedor === "proprio"}
                        onChange={() => setRecebedor("proprio")}
                        className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="recebedor-proprio" className="font-medium cursor-pointer">
                        Eu mesmo
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        Você mesmo receberá o produto no endereço selecionado
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        id="recebedor-outra"
                        name="recebedor"
                        value="outra-pessoa"
                        checked={recebedor === "outra-pessoa"}
                        onChange={() => setRecebedor("outra-pessoa")}
                        className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="recebedor-outra" className="font-medium cursor-pointer">
                        Outra pessoa
                      </label>

                      {recebedor === "outra-pessoa" && !editandoRecebedor && nomeRecebedor && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{nomeRecebedor}</p>
                              <p className="text-sm text-gray-600">Celular: {documentoRecebedor}</p>
                            </div>
                            <button
                              onClick={() => setEditandoRecebedor(true)}
                              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {recebedor === "outra-pessoa" && (editandoRecebedor || !nomeRecebedor) && (
                        <div className="mt-3 space-y-3">
                          <div>
                            <label htmlFor="nome-recebedor" className="block text-sm font-medium text-gray-700">
                              Nome completo
                            </label>
                            <input
                              id="nome-recebedor"
                              type="text"
                              value={nomeRecebedor}
                              onChange={(e) => setNomeRecebedor(e.target.value)}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                              placeholder="Nome de quem receberá"
                            />
                          </div>
                          <div>
                            <label htmlFor="documento-recebedor" className="block text-sm font-medium text-gray-700">
                              Celular
                            </label>
                            <input
                              id="documento-recebedor"
                              type="text"
                              value={documentoRecebedor}
                              onChange={(e) => setDocumentoRecebedor(e.target.value)}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                              placeholder="Ex: (11)98323-9784"
                            />
                          </div>
                          <button
                            onClick={() => setEditandoRecebedor(false)}
                            className="w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Confirmar recebedor
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna lateral com resumo */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Resumo do pedido</h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Produto</span>
                    <span>R$ {parseFloat(produto?.preco).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span>R$ {frete.toFixed(2)}</span>
                  </div>
                  <div className="my-3 border-t border-gray-200 pt-3"></div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() =>
                      handleForm({
                        enderecoId: enderecoId ? enderecoId : "1",
                        nomeRecebedor: nomeRecebedor,
                        documentoRecebedor: documentoRecebedor,
                      })
                    }
                    className="w-full mt-6 py-3 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    Ir para pagamento
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Ao continuar, você concorda com os termos de uso e políticas de privacidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmarPedido;
