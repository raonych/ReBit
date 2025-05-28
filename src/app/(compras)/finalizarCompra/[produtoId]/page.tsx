"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  CreditCard,
  CheckCircle2,
  QrCode,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

// Interface para os pedaços de confete
interface ConfettiPiece {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
}

export default function FinalizarCompra() {

  const params = useParams(); 
  const id = params?.produtoId as string;
  
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
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

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

  // Gerar confetes quando o modal é aberto
  useEffect(() => {
    if (showOrderSummary) {
      const colors = [
        "#22c55e",
        "#3b82f6",
        "#f97316",
        "#ec4899",
        "#a855f7",
        "#facc15",
      ];
      const pieces: ConfettiPiece[] = [];

      // Gerar 100 pedaços de confete
      for (let i = 0; i < 100; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100, // posição horizontal (%)
          size: Math.random() * 0.8 + 0.4, // tamanho entre 0.4 e 1.2rem
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5, // atraso na animação
        });
      }

      setConfetti(pieces);
      setShowSuccessAnimation(true);

      // Esconder a animação de sucesso após 2 segundos
      const timer = setTimeout(() => {
        setShowSuccessAnimation(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showOrderSummary]);

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

  // Variantes para animação dos elementos do modal
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
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
          `Finalizar pagamento`
        )}
      </button>

      {/* Animação de confete */}
      <AnimatePresence>
        {showOrderSummary && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute top-0 rounded-md"
                style={{
                  left: `${piece.x}%`,
                  width: `${piece.size}rem`,
                  height: `${piece.size * 0.4}rem`,
                  backgroundColor: piece.color,
                  originY: 0,
                }}
                initial={{ y: -20, opacity: 0, rotate: 0 }}
                animate={{
                  y: ["0vh", "100vh"],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, Math.random() * 360],
                  scale: [1, Math.random() * 0.5 + 0.5],
                }}
                transition={{
                  duration: Math.random() * 2 + 3,
                  delay: piece.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Resumo do Pedido */}
      <AnimatePresence>
        {showOrderSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
              onClick={() => setShowOrderSummary(false)}
            />

            <motion.div
              className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto relative z-10"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {/* Animação de sucesso */}
              {showSuccessAnimation && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      duration: 0.5,
                    }}
                    className="bg-green-100 rounded-full p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <CheckCircle2 className="h-16 w-16 text-green-600" />
                    </motion.div>
                  </motion.div>
                </div>
              )}

              <div
                className={`space-y-6 ${
                  showSuccessAnimation
                    ? "opacity-0"
                    : "opacity-100 transition-opacity duration-500"
                }`}
              >
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl font-bold">Resumo do Pedido</h2>
                  <p className="text-gray-500">Detalhes da sua compra</p>
                </motion.div>

                {/* Produto */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 pb-4 border-b border-gray-200"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold">Produto Seminovo</h3>
                      <span className="font-bold">R$279,90</span>
                    </div>
                    <p className="text-gray-500 text-sm">Quantidade: 1</p>
                  </div>
                </motion.div>

                {/* Resumo de valores */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-2 pb-4 border-b border-gray-200"
                >
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>R$ 279,90</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frete</span>
                    <span>R$ 9,90</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Desconto</span>
                    <span className="text-green-600">R$ -9,90</span>
                  </div>
                </motion.div>

                {/* Total */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-between items-center"
                >
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-xl font-bold">R$279,90</span>
                </motion.div>

                {/* Informações adicionais */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-1 text-sm text-gray-500"
                >
                  <p>* Frete calculado para CEP: 01000-000</p>
                  <p>* Entrega estimada: 3-5 dias úteis</p>
                </motion.div>

                {/* Métodos de pagamento */}
                <motion.div variants={itemVariants}>
                  <p className="font-medium mb-2">
                    Métodos de pagamentos aceitos:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      Visa
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      Mastercard
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      Elo
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      Pix
                    </span>
                  </div>
                </motion.div>

                {/* Botão para voltar à home */}
                <motion.div variants={itemVariants} className="pt-4">
                  <Link href="/">
                    <motion.button
                      className="w-full bg-black text-white py-3 px-4 rounded-md font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Voltar para a Home
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
