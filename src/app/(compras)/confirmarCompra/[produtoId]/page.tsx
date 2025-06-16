"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import FinalizarCompra from "@/lib/components/portalCompra/finalizarCompra"
import ConfirmarPedido from "@/lib/components/portalCompra/confirmarPedido"
import { compraService } from "@/lib/request/compra"
import { usuarioService } from "@/lib/request/usuarios"
import { Loader } from "lucide-react"


const ConfirmarCompra: React.FC = () => {
  const params = useParams();
  const produtoId = params?.produtoId as string;
  const router = useRouter();
  const [confirmado, setConfirmado] = useState(false);
  const [pedidoData, setPedidoData] = useState<any>();
  const [paymentDone, setPaymentDone] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(()=>{
    const verifyUser = async ()=>{
      try{
        await usuarioService.exibirPerfil();
        setVerified(true);
      }catch(error: any){
        if(error.status == 401)
          router.push("/login");
      }
    }

    verifyUser();
  },[])

  const handleConfirm = ()=>{
    confirmado 
    ?
    setConfirmado(false)
    :
    setConfirmado(true) 
  };

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

  if (!verified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 h-8 w-8 text-gray-600" />
        </div>
      </div>
    )
  }
  return confirmado 
  ?
  <FinalizarCompra id={produtoId} paymentDone={paymentDone} handlePayment={handlePayment} handleConfirm={handleConfirm}/>
  :
  <ConfirmarPedido id={produtoId} handleConfirm={handleConfirm} handleForm={handleForm} />
}

export default ConfirmarCompra;
