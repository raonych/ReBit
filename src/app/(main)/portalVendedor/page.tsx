"use client";
import React, { useEffect, useState } from 'react';
import ButtonColumn from '@/lib/components/portalVendedor/conversas';
import DataDisplay from '@/lib/components/portalVendedor/produtos';
import SecondaryDataDisplay from '@/lib/components/portalVendedor/avaliacoes';
import ChatPage from '@/lib/components/portalVendedor/chat';
import { useRouter } from "next/navigation";

function Seller() {
  const router = useRouter();

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }, [router]);

  const [conversaId, setconversaId] = useState<string>();

  const handleSetConversa = (id: string) => {
    setconversaId(id);
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full h-96 overflow-y-auto lg:w-1/4 min-h-screen">
            {conversaId ? (
              <ChatPage conversaId={conversaId} onVoltar={() => setconversaId(undefined)} />
            ) : (
              <ButtonColumn onButtonClick={handleSetConversa} />
            )}
            </div>
            <DataDisplay />
            <SecondaryDataDisplay />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Seller;
