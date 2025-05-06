"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, QrCode, Loader2 } from "lucide-react";
import Image from "next/image";
import OrderSummaryModal from "@/lib/components/detalhesCompra";

export default function FinalizarCompra() {
  const [paymentMethod, setPaymentMethod] = useState<
    "credit" | "debit" | "pix"
  >("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCVV] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  // Função para formatar o número do cartão
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const groups = [];

    for (let i = 0; i < digits.length && i < 16; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }

    return groups.join(" ");
  };

  // Função para formatar a data de validade
  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 2) {
      return digits;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  // Detectar a bandeira do cartão
  useEffect(() => {
    const cleanNumber = cardNumber.replace(/\s/g, "");

    if (cleanNumber.length < 2) {
      setCardBrand(null);
      return;
    }

    // Regras simplificadas para detecção de bandeira
    if (cleanNumber.startsWith("4")) {
      setCardBrand("visa");
    } else if (/^5[1-5]/.test(cleanNumber)) {
      setCardBrand("mastercard");
    } else if (/^3[47]/.test(cleanNumber)) {
      setCardBrand("amex");
    } else if (/^6(?:011|5)/.test(cleanNumber)) {
      setCardBrand("discover");
    } else if (/^(36|38|30[0-5])/.test(cleanNumber)) {
      setCardBrand("diners");
    } else if (/^(60|6521)/.test(cleanNumber)) {
      setCardBrand("hipercard");
    } else if (/^(50|5[6-9]|6[0-9])/.test(cleanNumber)) {
      setCardBrand("elo");
    } else {
      setCardBrand(null);
    }
  }, [cardNumber]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiry(e.target.value);
    setCardExpiry(formattedValue);
  };

  const handleFinishPayment = () => {
    setIsLoading(true);

    // Simulação de processamento de pagamento
    setTimeout(() => {
      setIsLoading(false);
      setShowOrderSummary(true);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-1">Finalizar Compra</h1>
      <p className="text-gray-500 mb-6">
        Escolha seu método de pagamento preferido
      </p>

      {/* Métodos de pagamento */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <button
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md ${
            paymentMethod === "credit"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setPaymentMethod("credit")}
        >
          <CreditCard size={18} />
          <span className="text-sm">Cartão de crédito</span>
        </button>

        <button
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md ${
            paymentMethod === "debit"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setPaymentMethod("debit")}
        >
          <CheckCircle2 size={18} />
          <span className="text-sm">Cartão de débito</span>
        </button>

        <button
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md ${
            paymentMethod === "pix"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setPaymentMethod("pix")}
        >
          <QrCode size={18} />
          <span className="text-sm">Pix</span>
        </button>
      </div>

      {/* Formulário de cartão */}
      {(paymentMethod === "credit" || paymentMethod === "debit") && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Número do Cartão
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              {cardBrand && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="h-6 w-10 relative">
                    <Image
                      src={`/card-brands/${cardBrand}.svg`}
                      alt={cardBrand}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="cardName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome no Cartão
            </label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Nome como está no cartão"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cardExpiry"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Validade
              </label>
              <input
                type="text"
                id="cardExpiry"
                value={cardExpiry}
                onChange={handleExpiryChange}
                placeholder="MM/AA"
                maxLength={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="cardCVV"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CVV
              </label>
              <input
                type="text"
                id="cardCVV"
                value={cardCVV}
                onChange={(e) =>
                  setCVV(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="123"
                maxLength={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="installments"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Parcelas
            </label>
            <select
              id="installments"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="1">1 x de R$299,90 (sem juros)</option>
              <option value="2">2 x de R$149,95 (sem juros)</option>
              <option value="3">3 x de R$99,97 (sem juros)</option>
              <option value="4">4 x de R$74,98 (sem juros)</option>
              <option value="5">5 x de R$59,98 (sem juros)</option>
              <option value="6">6 x de R$49,98 (sem juros)</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
            />
            <label
              htmlFor="saveCard"
              className="ml-2 block text-sm text-gray-700"
            >
              Salvar cartão para compras futuras
            </label>
          </div>
        </div>
      )}

      {/* Opção Pix */}
      {paymentMethod === "pix" && (
        <div className="border border-gray-200 rounded-md p-6 text-center">
          <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 flex items-center justify-center">
            <QrCode size={120} className="text-gray-700" />
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Escaneie o QR Code com o aplicativo do seu banco
          </p>
          <button className="text-sm font-medium text-gray-900 underline">
            Copiar código Pix
          </button>
        </div>
      )}

      <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Seus dados estão protegidos com criptografia SSL
      </div>

      <button
        onClick={handleFinishPayment}
        disabled={isLoading}
        className="w-full mt-6 bg-black text-white py-3 px-4 rounded-md font-medium flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin mr-2" />
            Processando pagamento...
          </>
        ) : (
          `Finalizar pagamento (R$299,90)`
        )}
      </button>

      {/* Modal de Resumo do Pedido */}
      {showOrderSummary && (
        <OrderSummaryModal onClose={() => setShowOrderSummary(false)} />
      )}
    </div>
  );
}
