// app/(main)/chat/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { conversaService } from "@/lib/request/conversas";

type Conversa = {
  id: number;
  produto: { nome: string };
  vendedor: { nome: string };
};

export default function ChatPage() {
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

      const exibeConversas = async () => {
        const conversas = await conversaService.listarConversas();
        setConversas(conversas.conversas);
      }
      exibeConversas();
    },[]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Suas Conversas</h1>

      <ul className="space-y-4">
        {conversas.map((conversa) => (
          <li
            key={conversa.id}
            className="p-4 bg-white rounded shadow hover:bg-gray-50 transition"
          >
            <Link href={`/chat/${conversa.id}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    Produto: {conversa.produto.nome}
                  </p>
                  <p className="text-gray-500">Com: {conversa.vendedor.nome}</p>
                </div>
                <span className="text-blue-600 text-sm">Ver conversa →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
