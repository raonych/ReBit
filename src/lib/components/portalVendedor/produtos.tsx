import React, { useEffect, useState} from 'react';
import {Loader, MapPin } from 'lucide-react';
import { usuarioService } from '@/lib/request/usuarios';
import Skeleton from "react-loading-skeleton";


const DataDisplay: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    const exibeMeusProdutos = async () =>{
      const meusProdutos = await usuarioService.exibirMeusProdutos();
      setProdutos(meusProdutos);
      setIsLoading(false);
    };

    exibeMeusProdutos();
  },[])
  const produtosSkeleton = Array.from({ length: 4 });

  if (isLoading) {
    return (
      <div className="w-full lg:w-1/2 flex-grow">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full flex items-center justify-center p-8">
          <div className="text-center">
            <Loader className="h-10 w-10 text-blue-500 animate-spin mx-auto" />
            <p className="mt-4 text-gray-500">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-1/2 flex-grow">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full p-6">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <p className="text-red-600 mb-2">Error</p>
              <p className="text-gray-600">{error}</p>
              <button 
                onClick={() => location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2 flex-grow">
      <div className="relative">
        <div className="grid grid-flow-col auto-cols-max overflow-hidden gap-7">
      {(produtos).map((item, index) => (
                    <div
                      key={item?.id || index}
                      className="w-74 bg-white rounded-lg overflow-hidden shadow-sm border border-zinc-200"
                    >
                        <div className="bg-gray-500 h-48" />
                      <div className="p-4">
                        <div className="font-bold text-xl mb-2">
                          {item.preco}
                        </div>
                        <div className="font-bold text-xl mb-2">
                            {item.nome}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 mb-1">
                          <MapPin size={16} />
                            <span className="text-sm"></span>
                        </div>
                        <div className="text-gray-600 text-sm">
                          03/04/2025
                        </div>
                      </div>
                    </div>
                  ))}
        </div>
      </div>
    </div>
  );
};

export default DataDisplay;