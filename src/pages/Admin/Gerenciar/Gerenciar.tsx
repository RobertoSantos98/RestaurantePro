import { useEffect, useState } from "react";
import { PedidoService } from "../../../services/PedidoService";
import type { Pedido } from "../../../types/types";
import Skeleton from "../../../components/Skeleton";
import ModalEditPedido from "../Edit/ModalEditPedido";

export default function GerenciarPedidos() {

    const [pedido, setPedido] = useState<Pedido[]>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [pedidoEditando, setPedidoEditando] = useState<Pedido | null>(null);

    useEffect(() => {

        const pedidoService = new PedidoService();

        const buscarPedidos = async () => {
            const lista = await pedidoService.buscarTodosPedido();
            setPedido(lista);
        }

        buscarPedidos();
    }, []);


    return (
        <div className="bg-gray-100 p-4 flex items-center justify-center">
            <div className=" bg-white rounded-xl w-full">

                <div className="bg-red-500 text-white rounded-t-xl">
                    <h1 className="p-2 font-bold">Gerenciar Pedidos</h1>

                </div>

                <div className=" overflow-y-auto h-screen">
                    {pedido !== undefined ? (
                        <table className="border-b w-full border rounded mb-4 ">
                            <thead className="border-gray-200">
                                <tr className="bg-gray-300 text-left">
                                    <th className="py-2 px-2">Pedido ID</th>
                                    <th className="py-2 px-2">Cliente</th>
                                    <th className="py-2 px-2">Status</th>
                                    <th className="py-2 px-2">Itens</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pedido.map((data) => (
                                    <tr onClick={() => { setModalOpen(true); setPedidoEditando(data); }} key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-2 px-2">{data.id}</td>
                                        <td className="py-2 px-2">{data.cliente.nome}</td>
                                        <td className="py-2 px-2">{data.status}</td>
                                        <td className="py-2 px-2">{data.itens.join(", ")}</td>
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

                {modalOpen && pedidoEditando && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <ModalEditPedido pedido={pedidoEditando} onClose={() => setModalOpen(false)} podeEditar={false} />
                    </div>
                )}

            </div>
        </div>
    )

}