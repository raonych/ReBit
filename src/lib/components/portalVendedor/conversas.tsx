import React, { useEffect } from 'react';
import { useState } from 'react';
import { conversaService } from '@/lib/request/conversas';
import { setLazyProp } from 'next/dist/server/api-utils';

interface ConversasProps {
  onButtonClick: (id: string) => void;
  conversas : any[];
}

const Conversas: React.FC<ConversasProps> = ({ onButtonClick, conversas }) => {
  const [activeButton, setActiveButton] = useState<string>('btn-1');
  const [loading, setLoading] = useState(true);

  const handleClick = (id: string) => {
    setActiveButton(id);
    onButtonClick(id);
  };
  
  return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-100">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Conversas com clientes</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {!loading && conversas.length == 0?(
            <div className="w-full text-left px-4 py-4 flex items-center justify-between" >
              Nenhum comprador iniciou conversas com você ainda.
            </div>
          ) : (conversas.map((conversa) => (
            <button
              key={conversa.id}
              onClick={() => handleClick(conversa.id)}
              className={`w-full text-left px-4 py-4 flex items-center justify-between transition-colors duration-150 ease-in-out ${
                activeButton === conversa.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="font-medium">{conversa.ultimaMensagem}</span>
            </button>
          )))}
        </div>
      </div>
  );
};

export default Conversas;

