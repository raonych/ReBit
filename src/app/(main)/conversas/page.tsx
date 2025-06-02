// app/(main)/chat/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { conversaService } from "@/lib/request/conversas";
import ChatPage from "@/lib/components/chat";
import { usuarioService } from "@/lib/request/usuarios";
import { Loader } from "lucide-react";

type Conversa = {
  id: number;
  produto: { nome: string };
  vendedor: { nome: string };
  vendedorId: number;
  comprador: {nome: string};
};

export default function Conversas() {
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [conversaId, setConversaId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
        const conversas = await conversaService.listarConversas();
        const usuario = await usuarioService.exibirPerfil();

        setUserId(usuario.id)
        setConversas(conversas.conversas);
        setIsLoading(false);
      }
      fetchData();
    },[]);

    const handleVoltar = () => {
      setConversaId(null);
    };

  if(isLoading){
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className="animate-spin mx-auto" />
      </div>
    )
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!conversaId ? (
        <>
          <h1 className="text-2xl font-bold mb-6">Suas Conversas</h1>
          <ul className="space-y-4">
            {conversas.map((conversa) => (
              <li
                key={conversa.id}
                className="p-4 bg-white rounded shadow hover:bg-gray-50 transition"
              >
                <button
                  onClick={() => setConversaId(conversa.id)}
                  className="w-full text-left"
                >
                  <div className="flex justify-between items-center cursor-pointer">
                    <div>
                      <p className="text-lg font-semibold">
                        Produto: {conversa.produto.nome}
                      </p>
                      <p className="text-l font-semibold">
                          {
                          userId === conversa.vendedorId
                              ? conversa.comprador.nome
                              : conversa.vendedor.nome
                          }
                        </p>
                    </div>
                    
                    <span className="text-green-700 text-sm">Ver conversa →</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ChatPage
          conversaId={conversaId}
          onVoltar={handleVoltar}
        />
      )}
    </div>
  );
}
