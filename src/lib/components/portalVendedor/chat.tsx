'use client'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { conversaService } from '@/lib/request/conversas'
import { usuarioService } from '@/lib/request/usuarios'
import { ArrowLeft, Loader } from 'lucide-react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

let socket: Socket
type ChatProps = {
    conversaId: string
    onVoltar: () => void
  }

export default function ChatPage({ conversaId,  onVoltar }: ChatProps) {
  const [mensagem, setMensagem] = useState('')
  const [mensagens, setMensagens] = useState<any[]>([])
  const [conversa, setconversa] = useState<any>()
  const [remetenteId, setRemetenteId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Inicializa socket e busca mensagens anteriores
  useEffect(() => {
    const fetchData = async () => {
        const usuario = await usuarioService.exibirPerfil();
      setRemetenteId(usuario.id);

      // 2. Buscar mensagens antigas da conversa
      const conversa = await conversaService.exibirConversa(+conversaId);
      setMensagens(conversa.mensagens || [])
      setconversa(conversa)
      setIsLoading(false);
    }

    fetchData()

    socket = io('http://localhost:3000', {
      path: '/api/socket/io',
    })

    socket.emit('joinRoom', conversaId)

    socket.on('newMessage', (msg) => {
      setMensagens((prev) => [...prev, msg])
    })

    return () => {
      socket.disconnect()
    }
  }, [conversaId])

  const handleEnviar = () => {
    if (!mensagem.trim() || remetenteId === null) return

    socket.emit('sendMessage', {
      conversaId,
      texto: mensagem,
      remetenteId,
    })

    setMensagem('')
  }

  return (
    <div className="max-w-2xl mx-auto p-4 rounded-lg shadow-sm border border-gray-100">
      <button onClick={onVoltar} className="text-gray-600 hover:text-gray-900">
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-2l font-semibold">{isLoading? <Skeleton width={80} /> : conversa.comprador.nome}</h1>
      <p className="text-xs mb-4">{isLoading? <Skeleton width={150} /> : conversa.produto.nome}</p>
      <div className="bg-gray-100 h-96 overflow-y-auto p-3 rounded shadow mb-4">
        {
           isLoading?
           <div className="h-60 flex items-center justify-center p-8">
               <div className="text-center">
                 <Loader className="h-10 w-10 text-blue-500 animate-spin mx-auto" />
                 <p className="mt-4 text-gray-500">Carregando mensagens...</p>
               </div> 
             </div>
             :

             mensagens.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${
                  msg.remetenteId === remetenteId ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                    msg.remetenteId === remetenteId
                      ? 'bg-green-900 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  {msg.texto} 
                </div>
              </div>
            ))
        }
        
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem"
        />
        <button
          onClick={handleEnviar}
          className="bg-green-900 text-white px-4 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  )
}
