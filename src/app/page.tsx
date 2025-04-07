import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Check,
  Recycle,
  DollarSign,
  Leaf,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="border-b border-zinc-200 py-6 bg-white">
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
              Categories
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Produtos em destaque */}
        <section className="py-12 px-4 bg-white">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Produtos em destaque</h2>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-zinc-200"
                  >
                    <div className="bg-gray-500 h-48"></div>
                    <div className="p-4">
                      <div className="font-bold text-xl mb-2">R$29</div>
                      <div className="flex items-center gap-1 text-gray-600 mb-1">
                        <MapPin size={16} />
                        <span className="text-sm">Guarulhos</span>
                      </div>
                      <div className="text-gray-600 text-sm">03/04/2025</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2">
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </section>

        {/* Como funciona? */}
        <section className="py-12 px-4 bg-zinc-50">
          <div className="w-full max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-16">Como funciona?</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="w-full md:w-1/3">
                <div className="w-[300px] h-[300px] bg-zinc-200 mx-auto"></div>
              </div>
              <div className="w-full md:w-1/2 space-y-6 text-left">
                <div className="flex items-center gap-4">
                  <span className="text-green-500">
                    <Check size={24} />
                  </span>
                  <span className="text-lg text-gray-800">
                    Cadastre sua conta
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-500">
                    <Check size={24} />
                  </span>
                  <span className="text-lg text-gray-800">
                    Compre e anuncie produtos
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-500">
                    <Check size={24} />
                  </span>
                  <span className="text-lg text-gray-800">
                    Contribua com a redução de lixo eletrônico
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviço simples e Transparente */}
        <section className="py-16 px-4 bg-white">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">
              Serviço simples e Transparente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-zinc-200 rounded-xl p-8 flex flex-col items-start">
                <div className="w-20 h-20 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-6 mx-auto">
                  <Recycle className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-900 w-full">
                  Economia Circular: Reutilize e Recicle
                </h3>
                <p className="text-gray-600">
                  Venda seus componentes e contribua para a reutilização e
                  redução do desperdício eletrônico.
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-8 flex flex-col items-start">
                <div className="w-20 h-20 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-6 mx-auto">
                  <DollarSign className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-900 w-full">
                  Peças Acessíveis para Reparo e Projetos
                </h3>
                <p className="text-gray-600">
                  Economize e encontre componentes de qualidade para suas
                  manutenções ou novos projetos, com preços acessíveis.
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-8 flex flex-col items-start">
                <div className="w-20 h-20 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-6 mx-auto">
                  <Leaf className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-900 w-full">
                  Sustentabilidade e Menos Lixo Eletrônico
                </h3>
                <p className="text-gray-600">
                  Ajude a reduzir o impacto ambiental comprando e vendendo
                  componentes usados e danificados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção adicional para manter o padrão de alternância */}
        <section className="py-16 px-4 bg-zinc-50">
          <div className="w-full max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Crie uma Conta</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Junte-se a outros que estão fazendo a diferença na redução de lixo
              eletrônico e aproveite todas as vantagens do nosso site.
            </p>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Cadastre-se agora
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white py-6 border-t border-zinc-200">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-gray-500">✺</span>
            <span className="font-semibold">ReBit</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2023 ReBit. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
