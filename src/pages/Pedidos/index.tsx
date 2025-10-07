import { useState, useEffect } from "react";
import PedidoComponent from "../../components/PedidoComponent";
import type { Pedido } from "../../types/types";
import { io } from "socket.io-client";
import { PedidoService } from "../../services/PedidoService";
import Skeleton from "../../components/Skeleton";
import { FaPlus } from "react-icons/fa";

import ModalEditPedido from "../Admin/Edit/ModalEditPedido";
import ModalError from "../../components/ModalError";

const socket = io("http://localhost:3000");

export default function Pedidos() {
  const pedidoService = new PedidoService();

  // const [option, setOption] = useState<string>("Todos");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mensagemErro, setMensagemErro]= useState("");

  const [paginaAtual, setPaginaAtual ] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState();
  const limite = 12;

  const buscarPedido = async (pagina:number) => {
    try {
      const response = await pedidoService.buscarTodosPedido(pagina, limite);
      setTotalPaginas(response.totalPages);
      setPedidos(response.data);
    } catch (error) {
      setMensagemErro((error as Error).message);
    }finally{
      setLoading(false)
    }

  };
  
  useEffect(() => {
    buscarPedido(paginaAtual);
  }, [paginaAtual])

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
    <div className="bg-gray-100 flex flex-col pb-28">
      <div className="w-full">
        <div className="flex justify-between items-center pl-4">
          <h1 className="text-3xl font-bold my-4">Pedidos</h1>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {loading && Array.from({ length: 10}).map((_, index) => (
              <Skeleton key={index} className="h-60 w-60 mr-4" />
          ))}
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

      {/* Paginação */}
                <div className="flex justify-center items-center gap-4 py-4">
                    <button
                        disabled={paginaAtual === 1}
                        onClick={() => setPaginaAtual((p) => p - 1)}
                        className={`px-4 py-2 rounded font-bold ${paginaAtual === 1
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                    >
                        Anterior
                    </button>

                    <span className="font-bold">
                        Página {paginaAtual} de {totalPaginas}
                    </span>

                    <button
                        disabled={paginaAtual === totalPaginas}
                        onClick={() => setPaginaAtual((p) => p + 1)}
                        className={`px-4 py-2 rounded font-bold ${paginaAtual === totalPaginas
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                    >
                        Próxima
                    </button>
                </div>

      {modalOpen && (
        <ModalEditPedido pedido={null} onClose={() => setModalOpen(false)} podeEditar={true} />
      )}

      {mensagemErro && (
        <ModalError message={mensagemErro} setMensagemErro={() => setMensagemErro("")} />
      )}

    </div>
  );
}
