'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { categoriaService } from '@/lib/request/categorias';
import {produtoService} from '@/lib/request/produto';
import { usuarioService } from '@/lib/request/usuarios';

export default function CadastroProduto() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [condicao, setCondicao] = useState('');
  const [categorias, setCategorias] = useState<any[]>([]);
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [vendedorId, setVendedorId] = useState(null);
  useEffect(()=>{
   const fetchData = async ()=>{
    const data = await categoriaService.categorias(); 
    const userId = await usuarioService.exibirPerfil();
    setVendedorId(userId.id);
    setCategorias(data.categorias);
    
   }
   
   fetchData();
  },[])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagemFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!imagemFile) {
    alert("Selecione uma imagem");
    return;
  }

 
  const formData = new FormData();
  formData.append('file', imagemFile);

  const imageUploadResponse = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!imageUploadResponse.ok) {
    alert("Erro ao fazer upload da imagem");
    return;
  }

  const imageData = await imageUploadResponse.json();
  const imagemUrl = imageData.url;

  const precoNumerico = parseFloat(preco);
  if (isNaN(precoNumerico)) {
    alert("Preço inválido");
    return;
  }

  const dados = {
    nome,
    descricao,
    preco: precoNumerico,
    condicao: condicao.toLowerCase(),
    categoriaId: parseInt(categoria),
    vendedorId,
    imagemUrl: imagemUrl,
  };
  console.log(dados)
  try {
    await produtoService.cadastrarProduto(dados);
    alert("Produto cadastrado com sucesso!");
    router.push("/produtos");
  } catch (error: any) {
    console.error(error);
    alert(error.message || "Erro ao cadastrar produto");
  }
};


  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Imagem / Preview */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-gray-300 rounded-lg overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Pré-visualização"
                  className="w-full h-[400px] object-cover"
                />
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
                  Pré-visualização da imagem
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="imagemInput"
              required
            />
            <label
              htmlFor="imagemInput"
              className="text-center border border-gray-400 text-gray-600 hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer transition w-full"
            >
              {previewUrl ? 'Trocar Imagem' : 'Selecionar Imagem'}
            </label>
          </div>

          {/* Formulário */}
          <div className="flex-1 flex flex-col gap-4">
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border rounded px-4 py-3"
              required
            />
            <input
              type="number"
              id="preco"
              placeholder="Preço"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="border rounded px-4 py-3"
              required
            />

            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border rounded px-4 py-3"
              required
            >
              <option value="">Categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>

            <select
              value={condicao}
              onChange={(e) => setCondicao(e.target.value)}
              className="border rounded px-4 py-3"
              required
            >
              <option value="">Condição</option>
              <option value="Usado">Usado</option>
              <option value="Danificado">Danificado</option>
              <option value="Novo">Novo</option>
            </select>

            <textarea
              placeholder="Descritivo"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="border rounded px-4 py-3 h-48 resize-none"
              required
            />
          </div>
        </div>

        {/* Botão de envio centralizado */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-md font-semibold transition"
          >
            Cadastrar Produto
          </button>
        </div>
      </form>
    </div>
  );
}
