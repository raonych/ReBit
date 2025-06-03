"use client"
import { useEffect, useState } from "react"
import type React from "react"

import Conversas from "@/lib/components/portalVendedor/conversas"
import Produtos from "@/lib/components/portalVendedor/produtos"
import Avaliacoes from "@/lib/components/portalVendedor/avaliacoes"
import Vendas from "@/lib/components/portalVendedor/vendas"
import ChatPage from "@/lib/components/chat"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import { usuarioService } from "@/lib/request/usuarios"
import { produtoService } from "@/lib/request/produto"
import { conversaService } from "@/lib/request/conversas"
import { compraService } from "@/lib/request/compra"


// Componente customizado de abas
interface TabButtonProps {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

const TabButton = ({ isActive, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex-1 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
      isActive
        ? "bg-white text-blue-600 border-b-2 border-blue-600"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
    }`}
  >
    {children}
  </button>
)

interface TabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: { id: string; label: string; content: React.ReactNode }[]
}

const CustomTabs = ({ activeTab, onTabChange, tabs }: TabsProps) => (
  <div className="h-full flex flex-col">
    {/* Tab Headers */}
    <div className="flex bg-gray-100 rounded-t-lg border-b">
      {tabs.map((tab) => (
        <TabButton key={tab.id} isActive={activeTab === tab.id} onClick={() => onTabChange(tab.id)}>
          {tab.label}
        </TabButton>
      ))}
    </div>

    {/* Tab Content */}
    <div className="flex-1 bg-white rounded-b-lg overflow-y-auto">
      {tabs.find((tab) => tab.id === activeTab)?.content}
    </div>
  </div>
)

function Seller() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [conversaId, setconversaId] = useState<string>()
  const [leftActiveTab, setLeftActiveTab] = useState("conversas")
  const [rightActiveTab, setRightActiveTab] = useState("produtos")

  // Estados para produtos
  const [produtos, setProdutos] = useState<any[]>([])
  const [produtosLoading, setProdutosLoading] = useState<boolean>(true)
  const [produtosError, setProdutosError] = useState<{ status: number; message: string } | null>(null)

  // Estados para avaliações
  const [avaliacoes, setAvaliacoes] = useState<any[]>([])
  const [avaliacoesLoading, setAvaliacoesLoading] = useState<boolean>(true)
  const [avaliacoesError, setAvaliacoesError] = useState<{ status: number; message: string } | null>(null)
  // Estado para conversas
  const [conversas, setConversas] = useState<any[]>([]);
  const [conversasLoading, setConversasLoading] = useState<boolean>(true)

  // Estados para vendas
  const [vendas, setVendas] = useState<any[]>([])
  const [vendasLoading, setVendasLoading] = useState<boolean>(true)
  const [vendasError, setVendasError] = useState<{ status: number; message: string } | null>(null)
 
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    const exibeMeusProdutos = async () => {
      try {
        setProdutosLoading(true)
        const meusProdutos = await usuarioService.exibirMeusProdutos()
        setProdutos(meusProdutos)
        setProdutosError(null)
      } catch (err: any) {
        setProdutosError({ status: err.status, message: err.message })
      } finally {
        setProdutosLoading(false)
      }
    }

    const exibeMinhasAvaliacoes = async () => {
      try {
        setAvaliacoesLoading(true)
        const minhasAvaliacoes = await usuarioService.exibirMinhasAvaliacoes()
        console.log(minhasAvaliacoes)
        setAvaliacoes(minhasAvaliacoes.avaliacoes || [])
        setAvaliacoesError(null)
      } catch (err: any) {
        setAvaliacoesError({ status: err.status, message: err.message })
        setAvaliacoes([])
      } finally {
        setAvaliacoesLoading(false)
      }
    }

    const exibeConversas = async () => {
      try {
        const response = await conversaService.listarConversasVendedor();
        setConversas(response.conversas)
      } catch (err: any) {
        setConversas([])
      } finally {
        setConversasLoading(false)
      }  
    }

    const exibeMinhasVendas = async () => {
      try {
        setVendasLoading(true)
        const minhasVendas = await usuarioService.exibirMinhasVendas()
        setVendas(minhasVendas || [])
        setVendasError(null)
      } catch (err: any) {
        setVendasError({ status: err.status, message: err.message })
        setVendas([])
      } finally {
        setVendasLoading(false)
      }
    }
    
    if (!isLoading) {
      exibeMeusProdutos();
      exibeMinhasAvaliacoes();
      exibeConversas();
      exibeMinhasVendas();
    }
  }, [isLoading])

  const handleSetConversa = (id: string) => {
    setconversaId(id)
  }

  const handleAtualizar = (produtoId: string) => {
    console.log("Atualizar produto:", produtoId)
    // Implementar lógica de atualização
  }

  const handleExcluir = async (produtoId: string) => {
    console.log("Excluir produto:", produtoId)
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await produtoService.ExcluirProduto(produtoId)
        setProdutos(produtos.filter((produto) => produto.id !== produtoId))
      } catch (error) {
        console.error("Erro ao excluir produto:", error)
        alert("Erro ao excluir produto. Tente novamente.")
      }
    }
  }

  const atualizaStatusCompra = async (status: string, vendaId: number) => {
    try {
      console.log(`Status: ${status} \n id da Venda: ${vendaId}`)
      await compraService.atualizaStatusCompra(status, vendaId)
      setVendas(
        vendas.map((venda) =>
          venda.id === vendaId ? { ...venda, status, atualizadoEm: new Date().toISOString() } : venda,
        ),
      )
      console.log(`Venda ${status}:` , vendaId)
    } catch (error) {
      console.error("Erro ao atualizar status venda:", error)
      alert("Erro ao atualizar status venda. Tente novamente.")
    }
  }


  const leftTabs = [
    {
      id: "conversas",
      label: "Conversas",
      content: <Conversas conversas={conversas} onButtonClick={handleSetConversa} />,
    },
    {
      id: "avaliacao",
      label: "Avaliação",
      content: <Avaliacoes isLoading={avaliacoesLoading} error={avaliacoesError} avaliacoes={avaliacoes} />,
    },
  ]

  // Configuração das abas da direita
  const rightTabs = [
    {
      id: "produtos",
      label: "Produtos",
      content: (
        <Produtos
          isLoading={produtosLoading}
          error={produtosError}
          produtos={produtos}
          handleAtualizar={handleAtualizar}
          handleExcluir={handleExcluir}
        />
      ),
    },
    {
      id: "vendas",
      label: "Vendas",
      content: (
        <Vendas
          isLoading={vendasLoading}
          error={vendasError}
          vendas={vendas}
          atualizaStatusCompra={atualizaStatusCompra}
        />
      ),
    },
  ]

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader className="animate-spin mx-auto" />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <main className="flex-1 overflow-hidden bg-gray-50">
        <div className="h-full max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-full flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4 flex flex-col h-full">
              {conversaId ? (
                <div className="h-full bg-white rounded-lg shadow-sm">
                  <ChatPage conversaId={conversaId} onVoltar={() => setconversaId(undefined)} />
                </div>
              ) : (
                <CustomTabs activeTab={leftActiveTab} onTabChange={setLeftActiveTab} tabs={leftTabs} />
              )}
            </div>

            <div className="flex-1 flex flex-col h-full">
              <CustomTabs activeTab={rightActiveTab} onTabChange={setRightActiveTab} tabs={rightTabs} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Seller
