import { useState, useEffect } from "react";
import PedidoComponent from "../../components/PedidoComponent";
import ModalError from "../../components/ModalError";
import type { Pedido } from "../../types/types";
import { io } from "socket.io-client";
import { PedidoService } from "../../services/PedidoService";
import Skeleton from "../../components/Skeleton";

const socket = io("http://localhost:3000");

export default function Pedidos() {

  // const [option, setOption] = useState<string>("Todos");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
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
    <div className="ml-8 bg-gray-100 flex">
      <div className="w-full">
        <div className="flex justify-between items-center pl-4">
          <h1 className="text-3xl font-bold my-4">Pedidos</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-red-600 text-white px-4 py-2 rounded-l-lg hover:bg-red-500 transition font-bold text-xl justify-center items-center"
          >
            {menuOpen ? ">" : "<"}
          </button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {loading && <Skeleton className="h-4 w-1/2 mb-2" />}
          {pedidos.map((pedido, index) => (
            <PedidoComponent key={index} pedido={pedido} atualizarPedido={atualizarPedido} />
          ))}
        </div>
      </div>

      <div
        className={`bg-red-600 text-white transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? "w-80" : "w-0"
          }`}
      >
        <h2 className="font-bold text-xl text-center">Mostrar apenas</h2>
        <button className="border-b-2 border-red-400 hover:bg-red-500 text-white py-2 w-full">Todos</button>
        <button className="border-b-2 border-red-400 hover:bg-red-500 text-white py-2 w-full">Para Envio</button>
        <button className="border-b-2 border-red-400 hover:bg-red-500 text-white py-2 w-full">Não Impressos</button>
        <button className="border-b-2 border-red-400 hover:bg-red-500 text-white py-2 w-full">Enviados</button>
      </div>


      {/* <ModalError message="Esta é uma área de destaque para informações importantes." /> */}

    </div>
  );
}
