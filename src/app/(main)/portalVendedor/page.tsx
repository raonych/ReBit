"use client";
import React, { useState } from 'react';
import ButtonColumn from '@/lib/components/portalVendedor/conversas';
import DataDisplay from '@/lib/components/portalVendedor/produtos';
import SecondaryDataDisplay from '@/lib/components/portalVendedor/avaliacoes';
import ChatPage from '@/lib/components/portalVendedor/chat';

function Seller() {
  const [conversaId, setconversaId] = useState<string>();

  const handleSetConversa = (id: string) => {
    setconversaId(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {conversaId ? (
              <ChatPage conversaId={conversaId} onVoltar={() => setconversaId(undefined)} />
            ) : (
              <ButtonColumn onButtonClick={handleSetConversa} />
            )}
            <DataDisplay />
            <SecondaryDataDisplay />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Seller;
