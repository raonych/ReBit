"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const hiddenRoutes = ["/login", "/cadastro", "/enderecos"];
  const isHidden = !!pathname && hiddenRoutes.includes(pathname);

  if (isHidden) return null;

  return (
    <footer
      className="py-4 sm:py-6 border-t border-zinc-200"
      style={{
        backgroundImage: 'url("/Background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-lg sm:text-xl">✺</span>
            <span className="font-semibold text-lg sm:text-xl">ReBit</span>
          </div>

          {/* Copyright */}
          <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-right">
            © 2025 ReBit. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
