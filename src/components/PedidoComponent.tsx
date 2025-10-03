
import { useState } from "react";
import ModalEditPedido from "../pages/Admin/Edit/ModalEditPedido";
import type { Pedido } from "../types/types";

interface PedidoComponentProps {
    pedido: Pedido;
    atualizarPedido: (id: string, status: string, clienteId: string) => void;
}

export default function PedidoComponent({ pedido, atualizarPedido }: PedidoComponentProps) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleTextButton = () => {
        switch (pedido.status) {
            case "PENDENTE":
                return "Iniciar Preparação";
            case "EM_PREPARACAO":
                return "Pedido em transito";
            case "SAIU_ENTREGAR":
                return "Pedido Entregue";
            case "ENTREGUE":
                return "Pedido Finalizado";
        }
    }

    const handleStatusButton = () => {
        switch (pedido.status) {
            case "PENDENTE":
                atualizarPedido(pedido.id.toString(), "EM_PREPARACAO", pedido.clienteId.toString());
                break;
            case "EM_PREPARACAO":
                atualizarPedido(pedido.id.toString(), "SAIU_ENTREGAR", pedido.clienteId.toString());
                break;
            case "SAIU_ENTREGAR":
                atualizarPedido(pedido.id.toString(), "ENTREGUE", pedido.clienteId.toString());
                break;
            case "ENTREGUE":
                break;
        }
    }


    return (
        <div
            onClick={() => setModalOpen(true)}
            className={`bg-white relative p-4 rounded-2xl shadow mb-4 w-auto sm:w-80 md:w-96 text-left lg:w-1/4 
      ${pedido.status !== "PENDENTE" ? "" : "border-2 border-red-500 shadow-md shadow-red-500"} 
      flex flex-col gap-2 hover:shadow-2xl transition-all`}
        >
            {pedido.status !== "PENDENTE" ? "" : <h1 className="text-red-500 font-bold absolute self-end">NOVO</h1>}
            <h2 className="text-xl font-bold">{pedido.cliente.nome}</h2>
            <p className="text-gray-600">Endereço: {pedido.cliente.numeroTelefone}</p>

            <div className="flex justify-between items-center">
                {pedido.itens.length > 1 ? (
                    <p className="text-gray-600">Itens: {pedido.itens.length} pratos</p>
                ) : (
                    <p className="text-gray-600">Item: {pedido.itens.length} prato</p>
                )}
                <p className="text-gray-600">{pedido.itens.map((i) => i.nome)}</p>
                <p className="text-gray-600">Quantidade: {pedido.itens.map((i) => i.quantidade)}</p>
            </div>

            <p className="text-gray-600">{pedido.opcional}</p>

            <div className="flex justify-between">
                <p className="text-gray-600">{pedido.data.toLocaleDateString()} {pedido.data.toLocaleTimeString()}</p>
            </div>

            <div className="bg-gray-200 h-0.5 w-1/5 my-1 self-center" />
            <p>Status: {pedido.status}</p>

            <div className="flex flex-wrap gap-2 justify-center">
                <button
                    onClick={(e) => { e.stopPropagation(); handleStatusButton(); }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded font-bold hover:bg-yellow-600 w-full max-w-80"
                >
                    {handleTextButton()}
                </button>
                {pedido.status !== "PENDENTE" ? "" : (
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600 w-full max-w-80"
                    >
                        Imprimir
                    </button>
                )}
            </div>

            {modalOpen && (
                <ModalEditPedido pedido={pedido} onClose={() => setModalOpen(false)} podeEditar={false} />
            )}
        </div>
    );

}