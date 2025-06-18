"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermosDeUso() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: 'url("/Background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <Link
        href="/"
        className="flex items-center gap-2 mb-8 cursor-pointer select-none"
      >
        <span className="text-gray-500 text-xl">✺</span>
        <span className="font-semibold text-2xl text-gray-800">ReBit</span>
      </Link>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] p-8 transition-all hover:shadow-[0_6px_24px_-2px_rgba(0,0,0,0.15)]">
        <div className="flex items-center mb-6">
          <Link
            href="/cadastro"
            className="flex items-center text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Voltar para o cadastro</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          Termos de Uso do ReBit
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-700">
              Ao acessar e utilizar o ReBit, você concorda com estes termos de uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossa plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
            <p className="text-gray-700">
              O ReBit é uma plataforma de marketplace que conecta compradores e vendedores de produtos usados, promovendo a economia circular e sustentável.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Conta de Usuário</h2>
            <h3 className="text-xl font-medium mb-3">3.1 Registro</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Você deve ter pelo menos 18 anos para criar uma conta</li>
              <li>As informações fornecidas devem ser verdadeiras e precisas</li>
              <li>Você é responsável por manter a confidencialidade de sua senha</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">3.2 Responsabilidades</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Manter suas informações atualizadas</li>
              <li>Notificar imediatamente sobre qualquer uso não autorizado de sua conta</li>
              <li>Não compartilhar suas credenciais de acesso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Uso da Plataforma</h2>
            <h3 className="text-xl font-medium mb-3">4.1 Anúncios</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Os anúncios devem ser precisos e não enganosos</li>
              <li>É proibido anunciar produtos ilegais ou proibidos</li>
              <li>Fotos devem ser reais do produto anunciado</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">4.2 Comunicação</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Manter comunicação respeitosa entre usuários</li>
              <li>Não utilizar linguagem ofensiva ou discriminatória</li>
              <li>Respeitar a privacidade de outros usuários</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Transações</h2>
            <h3 className="text-xl font-medium mb-3">5.1 Responsabilidades</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>O ReBit atua apenas como intermediário</li>
              <li>As transações são de responsabilidade direta entre comprador e vendedor</li>
              <li>Recomendamos sempre realizar encontros em locais seguros</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">5.2 Pagamentos</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>O ReBit não se responsabiliza por pagamentos realizados fora da plataforma</li>
              <li>Recomendamos utilizar métodos de pagamento seguros e rastreáveis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Privacidade e Dados</h2>
            <h3 className="text-xl font-medium mb-3">6.1 Coleta de Dados</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Coletamos informações necessárias para o funcionamento da plataforma</li>
              <li>Seus dados pessoais são protegidos conforme nossa Política de Privacidade</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">6.2 Uso de Dados</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Utilizamos seus dados apenas para fins específicos do serviço</li>
              <li>Não compartilhamos seus dados com terceiros sem seu consentimento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitações e Restrições</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Não é permitido o uso da plataforma para fins ilegais</li>
              <li>Não é permitido tentar acessar áreas restritas do sistema</li>
              <li>Não é permitido utilizar bots ou scripts automatizados sem autorização</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Modificações dos Termos</h2>
            <p className="text-gray-700">
              O ReBit reserva-se o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após sua publicação na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Rescisão</h2>
            <p className="text-gray-700">
              O ReBit pode encerrar ou suspender sua conta a qualquer momento, por qualquer motivo, incluindo violação destes termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Limitação de Responsabilidade</h2>
            <p className="text-gray-700 mb-4">O ReBit não se responsabiliza por:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Danos causados por produtos anunciados</li>
              <li>Problemas em transações entre usuários</li>
              <li>Perdas de dados ou interrupções no serviço</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Lei Aplicável</h2>
            <p className="text-gray-700">
              Estes termos são regidos pelas leis brasileiras e qualquer disputa será submetida à jurisdição exclusiva dos tribunais brasileiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contato</h2>
            <p className="text-gray-700">
              Para questões relacionadas a estes termos, entre em contato através do e-mail: suporte@rebit.com.br
            </p>
          </section>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 