"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, MapPin, User, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usuarioService } from "@/lib/request/usuarios";
import { useRouter } from 'next/navigation';
import EnderecoForm from "@/lib/components/endereco/EnderecoForm";

export default function EditarPerfil() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<any>();
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [editandoEndereco, setEditandoEndereco] = useState<number | null>(null);
  const [adicionandoEndereco, setAdicionandoEndereco] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const user = await usuarioService.exibirPerfil();
        const enderecosData = await usuarioService.exibirEnderecos();
        
        setUserData(user);
        setEnderecos(enderecosData);
        if (user.fotoPerfil) {
          setProfileImage(user.fotoPerfil);
        }
        setFormData({
          nome: user.nome || '',
          email: user.email || '',
          telefone: user.telefone || ''
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagemFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload da imagem
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Erro ao fazer upload da imagem');
        }

        const data = await response.json();
    
        await usuarioService.atualizarFotoPerfil(data.url);
        
      
        const user = await usuarioService.exibirPerfil();
        setUserData(user);
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
      }
    }
  };

  const handleEnderecoSubmit = async (dados: any) => {
    try {
      if (editandoEndereco) {
         await usuarioService.atualizarEndereco(editandoEndereco, dados);
      } else {
        await usuarioService.cadastrarEndereco(dados);
      }
      
      // Recarregar endereços
      const enderecosAtualizados = await usuarioService.exibirEnderecos();
      setEnderecos(enderecosAtualizados);
      
      setEditandoEndereco(null);
      setAdicionandoEndereco(false);
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await usuarioService.atualizarPerfil(formData);
      router.push('/perfil');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      <main className="flex-1 py-8 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Editar Perfil</h1>

          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Foto de perfil */}
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-zinc-200 mb-4">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Foto de perfil"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <User size={64} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Upload size={16} />
                  Alterar foto
                </button>
              </div>

              {/* Informações pessoais */}
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <User size={20} className="text-gray-600" />
                  Informações Pessoais
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700">Nome</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700">Telefone</label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Endereços */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MapPin size={20} className="text-gray-600" />
                Endereços
              </h2>
              {!adicionandoEndereco && !editandoEndereco && (
                <button
                  onClick={() => setAdicionandoEndereco(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus size={16} />
                  Adicionar Endereço
                </button>
              )}
            </div>

            <div className="space-y-6">
              {adicionandoEndereco && (
                <EnderecoForm
                  onSubmit={handleEnderecoSubmit}
                  onCancel={() => setAdicionandoEndereco(false)}
                />
              )}

              {enderecos && enderecos.length > 0 ? (
                enderecos.map((endereco: any) => (
                  <div key={endereco.id}>
                    {editandoEndereco === endereco.id ? (
                      <EnderecoForm
                        endereco={endereco}
                        onSubmit={handleEnderecoSubmit}
                        onCancel={() => setEditandoEndereco(null)}
                      />
                    ) : (
                      <div className="p-6 border rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <p><strong>CEP:</strong> {endereco.cep}</p>
                          <p><strong>Rua:</strong> {endereco.rua}</p>
                          <p><strong>Número:</strong> {endereco.numero}</p>
                          <p><strong>Bairro:</strong> {endereco.bairro}</p>
                          <p><strong>Complemento:</strong> {endereco.complemento || '-'}</p>
                          <p><strong>Cidade:</strong> {endereco.cidade}</p>
                          <p><strong>UF:</strong> {endereco.UF}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={() => setEditandoEndereco(endereco.id)}
                            className="px-4 py-2 text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            Editar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Nenhum endereço cadastrado
                </p>
              )}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end gap-4 mt-8">
            <Link
              href="/perfil"
              className="px-6 py-3 border border-zinc-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
