import { MapPin } from "lucide-react";
import Image from "next/image";

type ProdutoDivProps = {
  nome: string;
  preco: number | string;
  cidade: string;
  data: string;
  imagemUrl?: string;
};

export default function ProdutoDiv({
  nome,
  preco,
  cidade,
  data,
  imagemUrl = "/placeholder.png", // imagem padrão se não for fornecida
}: ProdutoDivProps) {
  return (
    <div className="w-74 bg-white rounded-lg overflow-hidden shadow-sm border border-zinc-200">
      <div className="bg-gray-100 h-48 relative">
        <Image
          src={imagemUrl}
          alt={nome}
          fill
          className="object-cover"
          sizes="300px"
        />
      </div>
      <div className="p-4">
        <div className="font-bold text-2xl mb-2">R$ {preco}</div>
        <div className="font-bold text-lg mb-2">{nome}</div>
        <div className="flex items-center gap-1 text-gray-600 mb-1">
          <MapPin size={16} />
          <span className="text-sm">{cidade}</span>
        </div>
        <div className="text-gray-600 text-sm">{data}</div>
      </div>
    </div>
  );
}
