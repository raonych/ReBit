"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MapPin, Heart, ArrowLeft, ExternalLink, Smartphone, Laptop, Monitor } from "lucide-react"

export default function DescarteCorreto() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-section") || "0")
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]))
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el
  }

  return (
    <div className="min-h-screen from-green-50 to-blue-50">

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section
          ref={setSectionRef(0)}
          data-section="0"
          className={`text-center mb-16 transition-all duration-1000 ${
            visibleSections.has(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-6xl mb-6">♻️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Dê um novo destino ao seu dispositivo antigo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tem um celular, notebook ou outro eletrônico parado em casa e não sabe o que fazer com ele?
            <br />
            <span className="font-semibold text-green-600">
              Descartar de forma correta é simples — e pode transformar vidas.
            </span>
          </p>
        </section>

        {/* Impact Section */}
        <section
          ref={setSectionRef(1)}
          data-section="1"
          className={`mb-16 transition-all duration-1000 delay-200 ${
            visibleSections.has(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="text-green-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Por que isso importa?</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Além de proteger o meio ambiente, o descarte consciente pode ajudar projetos sociais, ONGs e cooperativas
              que reaproveitam ou reciclam esses materiais de maneira segura e sustentável.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section
          ref={setSectionRef(2)}
          data-section="2"
          className={`mb-16 transition-all duration-1000 delay-300 ${
            visibleSections.has(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-red-500 mb-2">54 milhões</div>
              <p className="text-gray-600">toneladas de lixo eletrônico produzidas globalmente por ano</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-blue-500 mb-2">20%</div>
              <p className="text-gray-600">é a taxa de reciclagem adequada de eletrônicos no mundo</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-green-500 mb-2">80%</div>
              <p className="text-gray-600">dos materiais podem ser recuperados com descarte correto</p>
            </div>
          </div>
        </section>

        {/* Where to Dispose */}
        <section
          ref={setSectionRef(3)}
          data-section="3"
          className={`mb-16 transition-all duration-1000 delay-400 ${
            visibleSections.has(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                🔍 Confira algumas opções de onde você pode descartar seus eletrônicos:
              </h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-green-400 pl-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Ecopontos da sua cidade</h3>
                <p className="text-gray-600">Muitos aceitam resíduos eletrônicos gratuitamente</p>
              </div>

              <div className="border-l-4 border-blue-400 pl-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Lojas e assistências técnicas</h3>
                <p className="text-gray-600 mb-2">Fazem coleta para reciclagem:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Magazine Luiza</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Samsung</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Apple</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Casas Bahia</span>
                </div>
              </div>

              <div className="border-l-4 border-purple-400 pl-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">ONGs e projetos sociais:</h3>
                <div className="space-y-3">
                  <a
                    href="https://elixo.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>E-lixo Maps (elixo.org) – encontre pontos de coleta próximos a você</span>
                  </a>
                  <a
                    href="https://descartecerto.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Descarte Certo (descartecerto.com.br)</span>
                  </a>
                  <div className="text-gray-700">
                    <span>Instituto GEA – Ética e Meio Ambiente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Dispose */}
        <section
          ref={setSectionRef(4)}
          data-section="4"
          className={`mb-16 transition-all duration-1000 delay-500 ${
            visibleSections.has(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📱 O que você pode descartar?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <Smartphone className="mx-auto mb-4 text-gray-600" size={48} />
                <h3 className="font-semibold mb-2">Dispositivos Móveis</h3>
                <p className="text-sm text-gray-600">Celulares, tablets, smartwatches, fones de ouvido</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <Laptop className="mx-auto mb-4 text-gray-600" size={48} />
                <h3 className="font-semibold mb-2">Computadores</h3>
                <p className="text-sm text-gray-600">Notebooks, desktops, teclados, mouses</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <Monitor className="mx-auto mb-4 text-gray-600" size={48} />
                <h3 className="font-semibold mb-2">Eletrodomésticos</h3>
                <p className="text-sm text-gray-600">TVs, monitores, impressoras, câmeras</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section
          ref={setSectionRef(5)}
          data-section="5"
          className={`mb-16 transition-all duration-1000 delay-600 ${
            visibleSections.has(5) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">⚠️ Dicas importantes antes do descarte:</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p className="text-gray-700">
                  <strong>Faça backup dos seus dados</strong> e formate o dispositivo para proteger suas informações
                  pessoais
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <p className="text-gray-700">
                  <strong>Remova baterias</strong> quando possível, pois elas precisam de descarte específico
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <p className="text-gray-700">
                  <strong>Mantenha acessórios</strong> como cabos e carregadores junto com o dispositivo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          ref={setSectionRef(6)}
          data-section="6"
          className={`text-center transition-all duration-1000 delay-700 ${
            visibleSections.has(6) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="text-4xl mb-4">💚</div>
            <h2 className="text-2xl font-bold mb-4">
              Seu antigo dispositivo pode continuar útil — basta escolher o destino certo.
            </h2>
            <p className="text-green-100 mb-6">
              Cada dispositivo descartado corretamente é um passo em direção a um futuro mais sustentável.
            </p>
            <Link href="/">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Voltar ao início
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
