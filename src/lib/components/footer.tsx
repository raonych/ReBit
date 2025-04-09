"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const hiddenRoutes = ["/login", "/cadastro", "/enderecos"];
  const isHidden = hiddenRoutes.includes(pathname);

  if (isHidden) return null;

  return (
    <footer
      className="py-6 border-t border-zinc-200"
      style={{
        backgroundImage: 'url("/Background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <span className="text-gray-500">✺</span>
          <span className="font-semibold">ReBit</span>
        </div>
        <div className="text-sm text-gray-500">
          © 2025 ReBit. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
