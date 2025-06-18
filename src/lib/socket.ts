// lib/socket.ts
import { Server as NetServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { NextApiResponse } from 'next'
import { enviarMensgem } from './services/conversaService'

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: {
      io?: IOServer
    }
  }
}


const ioHandler = (_req: any, res: NextApiResponseWithSocket) => {

  if (!res.socket.server.io) {
    console.log(' Socket.IO iniciado')

    const httpServer: NetServer = res.socket.server as any
    const io = new IOServer(httpServer, {
      path: '/api/socket/io',
      addTrailingSlash: false,
    })

    io.on('connection', (socket) => {
      console.log('Novo socket conectado:', socket.id)

      socket.on('joinRoom', (conversaId: number) => {
        socket.join(String(conversaId))
        console.log(` Socket ${socket.id} entrou na sala ${conversaId}`)
      })



      socket.on('sendMessage', async ({ conversaId, texto, remetenteId }) => {
        try {
          const mensagem = await enviarMensgem(parseInt(conversaId), texto, remetenteId)

          io.to(String(conversaId)).emit('newMessage', mensagem)
        } catch (err) {
          console.error(' Erro ao enviar mensagem:', err)
        }
      })
    })

    res.socket.server.io = io
  }

  res.end()
}

export default ioHandler
