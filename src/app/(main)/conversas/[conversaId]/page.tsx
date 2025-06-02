// app/(main)/chat/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatPage from "@/lib/components/chat";

export default function Conversa() {
  const params = useParams();
  const conversaId = params?.conversaId as string;
  console.log("aq", conversaId);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    },[]);

    const handleVoltar = () => {
      router.push("/conversas");
    };

  return (
    <div className="max-w-4xl mx-auto p-4">
        <ChatPage
          conversaId={conversaId}
          onVoltar={handleVoltar}
        />
    </div>
  );
}
