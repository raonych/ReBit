import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { produtoService } from "../request/produto";

type ProdutoDivProps = {
  id: string;
  nome: string;
  preco: number | string;
  cidade: string;
  data: string;
  imagemUrl?: string;
  jaFavoritado: boolean;
};

export default function ProdutoDiv({
  id,
  nome,
  preco,
  cidade,
  data,
  imagemUrl = "/placeholder.png",
  jaFavoritado
}: ProdutoDivProps) {
  const router = useRouter();
  const [favoritado, setFavoritado] = useState(false);
  const [loading, setLoading] = useState(false);

  const irParaProduto = () => {
    router.push(`/produto/${id}`);
  };

   useEffect(() => {
  setFavoritado(jaFavoritado);
  }, [jaFavoritado]);

  const toggleFavorito = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try{
      const sucesso = await produtoService.favoritarProduto(id, favoritado);
    if (sucesso) {
      setFavoritado(!favoritado);
    }
    }catch(error: any){
      if(error.status == 401){
        router.push("/login");
      }
    }
    

    setLoading(false);
  };

  return (
    <div
      className="w-74 bg-white rounded-lg overflow-hidden shadow-sm border border-zinc-200 cursor-pointer"
      onClick={irParaProduto}
    >
      <div className="bg-gray-100 h-48 relative">
        <Image
          src={imagemUrl}
          alt={nome}
          fill
          className="object-cover"
          sizes="300px"
        />
        <button
          onClick={toggleFavorito}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white cursor-pointer"
        >
          <Heart
            className={`transition-all duration-300 ${
              favoritado
                ? "text-red-600 fill-red-600 text-[23px]"
                : "text-gray-500 text-[20px]"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="font-bold text-2xl mb-2">R$ {preco}</div>
        <div className="font-bold text-l mb-2">{nome}</div>
        <div className="flex items-center gap-1 text-gray-600 mb-1">
          <MapPin size={16} />
          <span className="text-sm">{cidade}</span>
        </div>
        <div className="text-gray-600 text-sm">{data}</div>
      </div>
    </div>
  );
}
