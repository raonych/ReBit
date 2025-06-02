"use client";
import React, { useEffect, useState } from 'react';
import Conversas from '@/lib/components/portalVendedor/conversas';
import Produtos from '@/lib/components/portalVendedor/produtos';
import ChatPage from '@/lib/components/chat';
import { useRouter } from "next/navigation";
import { Loader } from 'lucide-react';

function Seller() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [conversaId, setconversaId] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }else {
      setIsLoading(false); 
    }

  }, [router]);

  

  const handleSetConversa = (id: string) => {
    setconversaId(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className='animate-spin mx-auto'/>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full overflow-y-auto lg:w-1/4">
            {conversaId ? (
              <ChatPage conversaId={conversaId} onVoltar={() => setconversaId(undefined)} />
            ) : (
              <Conversas onButtonClick={handleSetConversa} />
            )}
            </div>
              <Produtos />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Seller;
