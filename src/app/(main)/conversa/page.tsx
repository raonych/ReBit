'use client'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { conversaService } from '@/lib/request/conversas'
import { usuarioService } from '@/lib/request/usuarios'

let socket: Socket
type ChatProps = {
    conversaId: string
  }

export default function ChatPage({ conversaId }: ChatProps) {
  const [mensagem, setMensagem] = useState('')
  const [mensagens, setMensagens] = useState<any[]>([])
  const [remetenteId, setRemetenteId] = useState<number | null>(null)

  // Inicializa socket e busca mensagens anteriores
  useEffect(() => {
    const fetchData = async () => {
        const usuario = await usuarioService.exibirPerfil();
      setRemetenteId(usuario.id);

      // 2. Buscar mensagens antigas da conversa
      const conversa = await conversaService.exibirConversa(+conversaId);
      setMensagens(conversa.mensagens || [])
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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Chat com o vendedor</h1>

      <div className="bg-gray-100 h-96 overflow-y-auto p-3 rounded shadow mb-4">
        {mensagens.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${
              msg.remetenteId === remetenteId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                msg.remetenteId === remetenteId
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {msg.texto}
            </div>
          </div>
        ))}
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
          className="bg-blue-600 text-white px-4 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  )
}
