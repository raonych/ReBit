import { ShoppingBag } from "lucide-react";
import Link from "next/link";

interface OrderSummaryModalProps {
  onClose: () => void;
}

export default function OrderSummaryModal({ onClose }: OrderSummaryModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Resumo do Pedido</h2>
            <p className="text-gray-500">Detalhes da sua compra</p>
          </div>

          {/* Produto */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-bold">Produto Premium</h3>
                <span className="font-bold">R$279,90</span>
              </div>
              <p className="text-gray-500 text-sm">Quantidade: 1</p>
            </div>
          </div>

          {/* Resumo de valores */}
          <div className="space-y-2 pb-4 border-b border-gray-200">
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
          </div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total</span>
            <span className="text-xl font-bold">R$279,90</span>
          </div>

          {/* Informações adicionais */}
          <div className="space-y-1 text-sm text-gray-500">
            <p>* Frete calculado para CEP: 01000-000</p>
            <p>* Entrega estimada: 3-5 dias úteis</p>
          </div>

          {/* Métodos de pagamento */}
          <div>
            <p className="font-medium mb-2">Métodos de pagamentos aceitos:</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                Visa
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                Mastercard
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">Elo</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                Boleto
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">Pix</span>
            </div>
          </div>

          {/* Botão para voltar à home */}
          <div className="pt-4">
            <Link href="/">
              <button className="w-full bg-black text-white py-3 px-4 rounded-md font-medium">
                Voltar para a Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
