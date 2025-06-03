"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import FinalizarCompra from "@/lib/components/portalCompra/finalizarCompra"
import ConfirmarPedido from "@/lib/components/portalCompra/confirmarPedido"
import { MetodoPagamento } from "@prisma/client"
import { compraService } from "@/lib/request/compra"


const ConfirmarCompra: React.FC = () => {
  const params = useParams();
  const produtoId = params?.produtoId as string;

  const [confirmado, setConfirmado] = useState(false);
  const [pedidoData, setPedidoData] = useState<any>();
  const [paymentDone, setPaymentDone] = useState(false);
  const handleConfirm = ()=>{
    confirmado 
    ?
    setConfirmado(false)
    :
    setConfirmado(true) 
  };
console.log("params:", params)
console.log("produtoId:", produtoId)

  const handleForm = (dados: {
      enderecoId: string | null;
      nomeRecebedor: string | null;
      documentoRecebedor: string | null;
    }) =>{
      setPedidoData(dados);
      console.log(pedidoData)
       setConfirmado(true)
    }

  const handlePayment = async (metodoPagamento: string) =>{
      const data = {metodoPagamento, produtoId, ...pedidoData}
      const response = await compraService.iniciarCompra(data);
      setPaymentDone(true);
  };

  return confirmado 
  ?
  <FinalizarCompra id={produtoId} paymentDone={paymentDone} handlePayment={handlePayment} handleConfirm={handleConfirm}/>
  :
  <ConfirmarPedido id={produtoId} handleConfirm={handleConfirm} handleForm={handleForm} />
}

export default ConfirmarCompra;
