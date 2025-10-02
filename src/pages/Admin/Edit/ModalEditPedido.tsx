import { AiOutlineClose } from "react-icons/ai";
import type { Pedido } from "../../../types/types";
import { useEffect, useState } from "react";

interface ModalEditPedidoProps {
    pedido: Pedido | null;
    onClose: () => void;
    podeEditar: boolean;
}

export default function ModalEditPedido(props: ModalEditPedidoProps) {

    const [formData, setFormData] = useState<Pedido>({
        id: 0,
        clienteId: 0,
        data: new Date(),
        opcional: "",
        status: "PENDENTE",
        cliente: {
            id: 0, 
            nome: "", 
            numeroTelefone: "" 
        },
        itens: [],
    });

    useEffect(() => {
        if (props.pedido) {
            setFormData(props.pedido)
        }
    }, [props.pedido]);

    return (
        <div className="bg-white rounded-xl shadow my-4 h-4/5 w-4/5 overflow-y-auto scroll-smooth scroll">
            <div className="bg-red-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{props.pedido? "Editar Pedido" : "Criar Novo Pedido"}</h1>
                <button onClick={props.onClose} className="hover:bg-red-700 p-2 rounded-full transition">
                    <AiOutlineClose size={24} />
                </button>
            </div>
            <div className="mb-4 p-4">
                <div className="border p-4 rounded mb-4">
                    <label className="block text-gray-700 font-bold mb-2">ID do Pedido:</label>
                    <input type="text" value={formData.id} disabled={true} className="rounded form-input block w-full border bg-gray-100 cursor-not-allowed mb-4 p-2" />
                    <label className="block text-gray-700 mb-2">Data do Pedido:</label>
                    <input type="date" disabled={props.podeEditar} value={formData.data} className=" p-2 rounded form-input mt-1 block w-full border mb-4" />
                    <label className="block text-gray-700 mb-2">Opcional:</label>
                    <textarea value={formData.opcional} className="p-2 rounded form-textarea mt-1 block w-full border mb-4" />
                    <label className="block text-gray-700 font-bold my-2">Status:</label>
                    <select value={formData.status} disabled={props.podeEditar} className="rounded form-select mt-1 block w-full border p-2">
                        <option value="PENDENTE">Pendente</option>
                        <option value="EM_PREPARACAO">Em Preparação</option>
                        <option value="SAIU_ENTREGAR">Saiu para Entregar</option>
                        <option value="ENTREGUE">Entregue</option>
                    </select>
                </div>

                <div className="block border p-4 rounded mb-4">
                    <label className="text-gray-700 mb-2">Cliente:
                        <input type="text" disabled={props.podeEditar} value={formData.cliente.nome} className="form-input w-full bg-gray-100 border p-2 rounded mt-2 mb-4" />
                    </label>
                    <label className="text-gray-700 mb-2"> Numero de Contato
                        <input type="text" disabled={props.podeEditar} value={formData.cliente.numeroTelefone} className="form-input bg-gray-100 w-full p-2 mb-4 rounded border" />
                    </label>
                </div>

                <div className="block border ronded">
                    <table className="w-full rounded">
                        <thead className="text-left bg-gray-400">
                            <tr>
                                <th className="p-2">ID</th>
                                <th className="p-2">Nome</th>
                                <th className="p-2">Quantidade</th>
                                <th className="p-2">Valor</th>
                            </tr>
                        </thead>
                        {formData.itens.map((item, index) => (
                            <tbody>
                                <tr className="hover:bg-gray-300">
                                    <td><input disabled={props.podeEditar} key={index} type="text" value={item.id} className="hover:bg-gray-200 form-input p-2 border w-full" /></td>
                                    <td><input disabled={props.podeEditar} key={index} type="text" value={item.nome} className="hover:bg-gray-200 form-input p-2 border w-full" /></td>
                                    <td><input disabled={props.podeEditar} key={index} type="text" value={item.quantidade} className="hover:bg-gray-200 form-input p-2 border w-full" /></td>
                                    <td><input disabled={props.podeEditar} key={index} type="text" value={item.valor} className="hover:bg-gray-200 form-input p-2 border w-full" /></td>
                                </tr>
                            </tbody>
                        ))

                        }
                    </table>
                </div>
            </div>
        </div>
    )

}