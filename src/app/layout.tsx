import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReBit - Compra e venda de componentes eletrônicos",
  description:
    "Marketplace para compra e venda de componentes eletrônicos com foco em sustentabilidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ` }
      >
         <header className="border-b border-zinc-200 py-6" style={{
      backgroundImage: 'url("/Background.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-gray-500 text-xl">✺</span>
            <span className="font-semibold text-xl">ReBit</span>
          </Link>
          <nav className="flex items-center gap-8">
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
            <Link
              href="/categorias"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Categorias
            </Link>
          </nav>
        </div>
      </header>
        {children}
        <footer className="py-6 border-t border-zinc-200" style={{
      backgroundImage: 'url("/Background.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
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
      </body>
    </html>
  );
}
