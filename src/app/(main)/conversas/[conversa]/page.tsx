"use client";

import { useEffect} from "react";
import { useParams, useRouter } from "next/navigation";
import ChatPage from "@/lib/components/portalVendedor/chat";


export default function Chat() {
  const router = useRouter();
  const params = useParams();
  const conversaId = params?.conversa as string;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    },[]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ChatPage conversaId={conversaId}  onVoltar={() => router.push("/conversas")}/> 
    </div>
  );
}
