"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EditarPerfil() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      <main className="flex-1 py-8 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Editar Perfil</h1>

          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* foto de perfil*/}
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-zinc-200 mb-4">
                  {profileImage ? (
                    <Image
                      src={profileImage || "/placeholder.svg"}
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
                  onClick={triggerFileInput}
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

                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="nome"
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="telefone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-gray-600" />
              Endereço
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="cep"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CEP
                  </label>
                  <input
                    type="text"
                    id="cep"
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="00000-000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="rua"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Rua
                  </label>
                  <input
                    type="text"
                    id="rua"
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Nome da rua"
                  />
                </div>

                <div>
                  <label
                    htmlFor="numero"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Número
                  </label>
                  <input
                    type="text"
                    id="numero"
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="123"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bairro"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bairro
                  </label>
                  <input
                    type="text"
                    id="bairro"
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Nome do bairro"
                  />
                </div>

                <div>
                  <label
                    htmlFor="complemento"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="complemento"
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Apto 101, Bloco B"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cidade"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Nome da cidade"
                  />
                </div>

                <div>
                  <label
                    htmlFor="uf"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    UF
                  </label>
                  <select
                    id="uf"
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="">Selecione</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end gap-4 mt-8">
            <Link
              href="/perfil"
              className="px-6 py-3 border border-zinc-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Salvar alterações
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
