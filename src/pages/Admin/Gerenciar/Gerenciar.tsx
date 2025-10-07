import { useEffect, useState } from "react";
import { PedidoService } from "../../../services/PedidoService";
import type { Pedido } from "../../../types/types";
import Skeleton from "../../../components/Skeleton";
import ModalEditPedido from "../Edit/ModalEditPedido";

export default function GerenciarPedidos() {
    const pedidoService = new PedidoService();

    const [pedido, setPedido] = useState<Pedido[]>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [pedidoEditando, setPedidoEditando] = useState<Pedido | null>(null);
    const [filtrar, setFiltrar] = useState("");

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const limite = 10;

    const buscarPedidos = async (pagina: number) => {
        const response = await pedidoService.buscarTodosPedido(pagina, limite);
        setPedido(response.data);
        setTotalPaginas(response.totalPages);
    }
    
    useEffect(() => {
        buscarPedidos(paginaAtual);
    }, [paginaAtual]);


    return (
        <div className="bg-gray-100 p-4 flex items-center justify-center h-full">
            <div className=" bg-white rounded-xl w-full h-full">

                <div className="bg-red-500 text-white rounded-t-xl">
                    <h1 className="p-2 font-bold">Gerenciar Pedidos</h1>
                    <div className="p-2 gap-2 flex flex-col">
                        <p>Procurar por: </p>
                        <div className="flex justify-around items-center">
                            <label className="text-white">Cliente:
                                <input type="text" value={filtrar} onChange={(e) => setFiltrar(e.target.value)} className="p-2 text-black ml-2 rounded " />
                            </label>
                            <label>Data:
                                <input type="date" className="text-black ml-2 rounded p-2" />
                            </label>
                            <button className="bg-yellow-400 p-2 rounded font-bold ">Buscar</button>
                        </div>
                    </div>
                </div>

                <div className=" overflow-y-auto h-full">
                    {pedido !== undefined ? (
                        <table className="border-b w-full border rounded mb-4 ">
                            <thead className="border-gray-200">
                                <tr className="bg-gray-300 text-left">
                                    <th className="py-2 px-2">Pedido ID</th>
                                    <th className="py-2 px-2">Cliente</th>
                                    <th className="py-2 px-2">Data</th>
                                    <th className="py-2 px-2">Status</th>
                                    <th className="py-2 px-2">Itens</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pedido.map((data) => (
                                    <tr onClick={() => { setModalOpen(true); setPedidoEditando(data); }} key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-2 px-2">{data.id}</td>
                                        <td className="py-2 px-2">{data.cliente.nome}</td>
                                        <td className="py-2 px-2">{data.data.toLocaleDateString()}, {data.data.toLocaleTimeString()}</td>
                                        <td className="py-2 px-2 flex gap-2 items-center">{handleColorStatus(data.status).color} {handleColorStatus(data.status).string}</td>
                                        <td className="py-2 px-2">{data.itens.length}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    ) : (
                        <div>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <Skeleton key={index} className="h-8 w-full m-4" />
                            ))}
                        </div>
                    )}
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

                {modalOpen && pedidoEditando && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <ModalEditPedido pedido={pedidoEditando} onClose={() => setModalOpen(false)} podeEditar={false} />
                    </div>
                )}

            </div>
        </div>
    )

}

    const handleColorStatus = (status: string) => {
        switch (status) {
            case "PENDENTE":
                return {
                    color: <div className="p-2 bg-red-500 rounded-full border border-red-400" />,
                    string: "Pendente"
                }

            case "EM_PREPARACAO":
                return {
                    color: <div className="p-2 bg-yellow-400 rounded-full border border-yellow-500" />,
                    string: "Em Preparação"
                }

            case "SAIU_ENTREGAR":
                return {
                    color: <div className="p-2 bg-yellow-400 rounded-full border border-yellow-500" />,
                    string: "Saiu Para Entregar"
                }

            case "ENTREGUE":
                return {
                    color: <div className="p-2 bg-green-400 rounded-full border border-green-500" />,
                    string: "Entregue"
                }
            default:
                return {
                    color: <div className="p-2 bg-gray-300 rounded-full border border-gray-400" />,
                    string: "Desconhecido"
                };
        }

    }