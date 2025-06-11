"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DropDownCategorias from "./categorias";
import { useEffect, useState } from "react";
import { MessageCircleMore, Menu, X } from "lucide-react";

export function Header() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogged(true);
    }
    setIsloading(false);

    const listener = () => {
      setIsLogged(true);
    };

    const logoutListener = () => {
      setIsLogged(false);
    };

    window.addEventListener("login", listener);
    window.addEventListener("logout", logoutListener);
    return () => {
      window.removeEventListener("login", listener);
      window.removeEventListener("logout", logoutListener);
    };
  }, []);

  const pathname = usePathname();

  const hiddenRoutes = ["/login", "/cadastro", "/enderecos"];
  const isHidden = !!pathname && hiddenRoutes.includes(pathname);

  if (isHidden) return null;

  // Fechar menu mobile ao clicar em um link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="border-b border-zinc-200 py-4 sm:py-6 relative"
      style={{
        backgroundImage: 'url("/Background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <span className="text-gray-500 text-lg sm:text-xl">✺</span>
            <span className="font-semibold text-lg sm:text-xl">ReBit</span>
          </Link>

          {/* Desktop Navigation */}
          {!isLoading && (
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 relative z-50">
            <Link
            href="/produtos"
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            Produtos
          </Link>
              {isLogged ? (
                <>
                  <Link
                    href="/portal"
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
                  >
                    Portal do anunciante
                  </Link>
                  <Link
                    href="/favoritos"
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Favoritos
                  </Link>
                  <Link
                    href="/perfil"
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
                  >
                    Minha conta
                  </Link>
                  <Link
                    href="/conversas"
                    className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <MessageCircleMore className="w-4 h-4" />
                    <span className="hidden xl:inline">Chat</span>
                  </Link>
                  {/* Container para dropdown com posicionamento correto */}
                  <div className="relative">
                    <DropDownCategorias />
                  </div>
                </>
              ) : (
                <>                
                  <Link
                    href="/login"
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Login
                  </Link>
                  {/* Container para dropdown com posicionamento correto */}
                  <div className="relative">
                    <DropDownCategorias />
                  </div>
                </>
              )}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {!isLoading && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors z-50"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {!isLoading && isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-200 shadow-lg z-40">
            <nav className="flex flex-col py-4 px-4 sm:px-6">
              {isLogged ? (
                <>
                  <Link
                    href="/portal"
                    onClick={handleLinkClick}
                    className="py-3 text-sm text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    Portal do anunciante
                  </Link>
                  <Link
                    href="/favoritos"
                    onClick={handleLinkClick}
                    className="py-3 text-sm text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    Favoritos
                  </Link>
                  <Link
                    href="/perfil"
                    onClick={handleLinkClick}
                    className="py-3 text-sm text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    Minha conta
                  </Link>
                  <Link
                    href="/conversas"
                    onClick={handleLinkClick}
                    className="py-3 flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <MessageCircleMore className="w-4 h-4" />
                    Chat
                  </Link>
                  {/* Dropdown centralizado para mobile */}
                  <div className="py-3  ml-50 border-b border-gray-100 last:border-b-0 flex ">
                    <div className="w-full max-w-xs">
                      <DropDownCategorias />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/Produtos"
                    onClick={handleLinkClick}
                    className="py-3 text-sm text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    Produtos
                  </Link>
                  <Link
                    href="/login"
                    onClick={handleLinkClick}
                    className="py-3 text-sm text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    Login
                  </Link>
                  {/* Dropdown centralizado para mobile */}
                  <div className="py-3 ml-50 border-b border-gray-100 last:border-b-0 flex justify-center">
                    <div className="w-full max-w-xs">
                      <DropDownCategorias />
                    </div>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
