"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DropDownCategorias from "./categorias";
import { useEffect, useState } from "react";
import { MessageCircleMore } from "lucide-react";

export function Header() {

  const [isLogged, setIsLogged] = useState<boolean>(false); 
  const [isLoading, setIsloading] = useState<boolean>(true); 

  useEffect(() => {
      const token = localStorage.getItem("token");
      
      if(token){
        setIsLogged(true);
      }
      setIsloading(false);
    }, []);

  useEffect(() => {
  const listener = () => {
    setIsLogged(true);
  };
  window.addEventListener("login", listener);
  return () => window.removeEventListener("login", listener);
}, []);
    
  const pathname = usePathname();

  const hiddenRoutes = ["/login", "/cadastro", "/enderecos"];
  const isHidden = !!pathname && hiddenRoutes.includes(pathname);

  if (isHidden) return null;

  return (
    <header
      className="border-b border-zinc-200 py-6"
      style={{
        backgroundImage: 'url("/Background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-gray-500 text-xl">✺</span>
          <span className="font-semibold text-xl">ReBit</span>
        </Link>

        {!isLoading && (
        isLogged ? (
          <nav className="flex items-center gap-8 relative z-50">
            <Link
              href="/favoritos"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Favoritos
            </Link>

            <Link
              href="/perfil"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Perfil
            </Link>
            <Link
              href="/conversas"
              className="flex items-center text-sm text-gray-700 hover:text-gray-900"
            >
              <MessageCircleMore />
              Chat
            </Link>
            <DropDownCategorias />
          </nav>
        ) : (
          <nav className="flex items-center gap-8 relative z-50">
            <Link
              href="/funcionamento"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Funcionamento
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
            <DropDownCategorias />
          </nav>
        )
      )}
        
      </div>
    </header>
  );
}
