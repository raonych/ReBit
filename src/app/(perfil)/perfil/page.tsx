"use client";

import { usuarioService } from "@/lib/request/usuarios";
import { MapPin, User, Mail, Phone, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PerfilUsuario() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const user = await usuarioService.exibirPerfil();
        setUserData(user);
        setProfileImage(user.fotoPerfil);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    };

    fetchData();
  }, []);

  console.log("AQUI", userData);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      <main className="flex-1 py-8 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Perfil do Usuário</h1>
            <button
              onClick={async () => {
                router.push("/");
                await usuarioService.logout();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Sair
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-zinc-200 mb-4">
                  {profileImage ? (
                    <Image  
                      src={userData.fotoPerfil}
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
                <p className="text-lg font-semibold">{userData.nome}</p>
              </div>

              <div className="w-full md:w-2/3 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User size={20} className="text-gray-600" />
                  Informações Pessoais
                </h2>
                <p>
                  <strong>Nome:</strong> {userData.nome}
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} /> {userData.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} /> {userData.telefone}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-gray-600" />
              Endereço
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
              <p>
                <strong>CEP:</strong> {userData.enderecos[0]?.cep}
              </p>
              <p>
                <strong>Rua:</strong> {userData.enderecos[0]?.rua}
              </p>
              <p>
                <strong>Número:</strong> {userData.enderecos[0]?.numero}
              </p>
              <p>
                <strong>Bairro:</strong> {userData.enderecos[0]?.bairro}
              </p>
              <p>
                <strong>Complemento:</strong>{" "}
                {userData.enderecos[0]?.complemento}
              </p>
              <p>
                <strong>Cidade:</strong> {userData.enderecos[0]?.cidade}
              </p>
              <p>
                <strong>UF:</strong> {userData.enderecos[0]?.UF}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <Link
              href="/minhasCompras"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              Minhas Compras
            </Link>
            <Link
              href="/editarPerfil"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Editar perfil
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
