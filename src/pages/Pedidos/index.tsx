import { useState, useEffect } from "react";
import PedidoComponent from "../../components/PedidoComponent";
// import ModalError from "../../components/ModalError";
import type { Pedido } from "../../types/types";
import { io } from "socket.io-client";
import { PedidoService } from "../../services/PedidoService";
import Skeleton from "../../components/Skeleton";
import { FaPlus } from "react-icons/fa";

import ModalEditPedido from "../Admin/Edit/ModalEditPedido";

const socket = io("http://localhost:3000");

export default function Pedidos() {

  // const [option, setOption] = useState<string>("Todos");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const pedidoService = new PedidoService();

    const buscarPedido = async () => {
      const response = await pedidoService.buscarTodosPedido();
      // Converte data para Date
      const pedidosComData = response.map(p => ({
        ...p,
        data: new Date(p.data),
      }));

      // Ordena do mais recente para o mais antigo
      const pedidosOrdenados = pedidosComData.sort(
        (a, b) => b.data.getTime() - a.data.getTime()
      );
      console.log("Pedidos carregados:", pedidosOrdenados);
      setPedidos(pedidosOrdenados);
      setLoading(false);
    };
    buscarPedido();
  }, [])

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connectado no Server com o id: " + socket.id);
    });

    socket.on("novoPedido", (pedido: Pedido) => {
      console.log("Novo pedido recebido: ", pedido);

      // Converte data para Date
      const pedidoComData = { ...pedido, data: new Date(pedido.data) };

      setPedidos((prev) => {
        // adiciona no topo e mantém ordenado do mais recente
        return [pedidoComData, ...prev].sort((a, b) => b.data.getTime() - a.data.getTime());
      });
    });

    socket.on("disconnect", () => {
      console.log("Desconectado do servidor");
    });

    return () => {
      socket.off("connect");
      socket.off("novoPedido");
      socket.off("disconnect");
    };
  }, []);

  const atualizarPedido = async (id: string, status: string, clienteId: string) => {
    const pedidoService = new PedidoService();
    const response = await pedidoService.atualizarPedido(id, status, clienteId);
    if (response) {
      setPedidos((prev) => prev.map(p => p.id === Number(id) ? response : p));
    }
  };

  return (
    <div className="bg-gray-100 flex">
      <div className="w-full">
        <div className="flex justify-between items-center pl-4">
          <h1 className="text-3xl font-bold my-4">Pedidos</h1>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {loading && <Skeleton className="h-20 w-20 mb-2" />}
          {pedidos.map((pedido, index) => (

              <PedidoComponent key={index} pedido={pedido} atualizarPedido={atualizarPedido}/>

          ))}
        </div>
      </div>

      <div className="bg-red-600 text-white fixed bottom-0 w-full p-2 flex items-center justify-around">

        <div className="flex gap-4 p-4 rounded">
          <label className=" text-white">Filtrar
            <select name="" id="" className=" rounded p-2 ml-2 text-black">
              <option value="Todos">Todos</option>
              <option value="Para_Envio">Para Envio</option>
              <option value="Não_Impresso">Não Impresso</option>
              <option value="Enviados">Enviados</option>
            </select>
          </label>
          <button className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded font-bold ">Buscar</button>
        
        </div>

        <div className=" p-4 rounded flex">
          <label className="gap-4 flex items-center">Adicionar Pedido:
            <button onClick={()=> setModalOpen(true)} className="bg-yellow-400 hover:bg-yellow-500 p-4 rounded"><FaPlus/></button>
          </label>

        </div>

      </div>

      {modalOpen && (
        <ModalEditPedido pedido={null} onClose={() => setModalOpen(false)} podeEditar={false} />
      )}


      {/* <ModalError message="Esta é uma área de destaque para informações importantes." /> */}

    </div>
  );
}
