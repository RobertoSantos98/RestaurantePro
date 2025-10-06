import { AiOutlineClose } from "react-icons/ai";
import type { Cardapio, Pedido, Prato } from "../../../types/types";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CardapioService } from "../../../services/CardapioService";

interface ModalEditPedidoProps {
    pedido: Pedido | null;
    onClose: () => void;
    podeEditar: boolean;
}

export default function ModalEditPedido(props: ModalEditPedidoProps) {

    const [ pratos, setPratos ] = useState<Prato[]>([]);
    const [ inputValue, setInputValue ] = useState("");
    const [ sugestoes, setSugestoes] = useState<string[]>([])

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

    useEffect(() => {
        const cardapioService = new CardapioService();
        const buscarCardapio = async () => {
            const lista: Cardapio = await cardapioService.buscarCardapio(6);
            setPratos(lista.pratos);
            console.log(lista);
        }
        buscarCardapio();
    },[]);

    const handleSelected = (valor: string) => {
        setInputValue(valor);
        setSugestoes([]);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setInputValue(valor);

        if (valor.length > 0) {
            const filtrado = pratos.filter((item)=>
                item.nome.toLowerCase().includes(valor.toLowerCase())
            )
            setSugestoes(filtrado.map((i)=> i.nome));
        }else{
            setSugestoes([]);
        }
    }



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow h-4/5 w-4/5 flex flex-col">
                <div className="bg-red-600 text-white p-4 flex justify-between items-center rounded-t-xl">
                    <h1 className="text-2xl font-bold">{props.pedido ? "Editar Pedido" : "Criar Novo Pedido"}</h1>
                    <button onClick={(e) => {e.stopPropagation(); props.onClose()}} className="hover:bg-red-700 p-2 rounded-full transition">
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <div className="overflow-y-auto">

                    <div className="mb-4 p-4 flex flex-col">
                        <div className="border p-4 rounded mb-4">
                            {props.pedido && (<label className="block text-gray-700 font-bold mb-2">ID do Pedido:</label>)}
                            {props.pedido && (<input type="text" value={formData.id} disabled={true} className="rounded form-input block w-full border bg-gray-100 cursor-not-allowed mb-4 p-2" />)}
                            {props.pedido && (<label className="block text-gray-700 mb-2">Data do Pedido:</label>)}
                            {props.pedido && (<input type="date" disabled value={formData.data.toISOString().split("T")[0]} className=" p-2 rounded form-input mt-1 block w-full border mb-4" />)}
                            <label className="block text-gray-700 mb-2">Opcional:</label>
                            <textarea value={formData.opcional} onChange={(e) => setFormData({...formData, opcional: e.target.value})} className="p-2 rounded form-textarea mt-1 block w-full border mb-4" />
                            <label className="block text-gray-700 font-bold my-2">Status:</label>
                            <select value={formData.status} disabled={!props.podeEditar} className="rounded form-select mt-1 block w-full border p-2">
                                <option value="PENDENTE">Pendente</option>
                                <option value="EM_PREPARACAO">Em Preparação</option>
                                <option value="SAIU_ENTREGAR">Saiu para Entregar</option>
                                <option value="ENTREGUE">Entregue</option>
                            </select>
                        </div>

                        <div className="block border p-4 rounded mb-4">
                            <label className="text-gray-700 mb-2">Cliente:
                                <input type="text" disabled={!props.podeEditar} value={formData.cliente.nome} onChange={(e)=> setFormData({...formData, cliente: {...formData.cliente, nome: e.target.value}})} className="form-input w-full bg-gray-100 border p-2 rounded mt-2 mb-4" />
                            </label>
                            <label className="text-gray-700 mb-2"> Numero de Contato
                                <input type="text" disabled={!props.podeEditar} value={formData.cliente.numeroTelefone} onChange={(e) => setFormData({...formData, cliente: {...formData.cliente, numeroTelefone: e.target.value}})} className="form-input bg-gray-100 w-full p-2 mb-4 rounded border" />
                            </label>
                        </div>

                        <div className="block border ronded pb-4">
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
                                            <td><input disabled={!props.podeEditar} key={index} type="text" value={item.id} className="hover:bg-gray-200 form-input p-2 border w-full" /></td>
                                            <td><input disabled={!props.podeEditar} key={index} type="text" value={item.nome} className="hover:bg-gray-200 form-input p-2 border w-full" /></td>
                                            <td><input disabled={!props.podeEditar} key={index} type="text" value={item.quantidade} className="hover:bg-gray-200 form-input p-2 border w-full" /></td>
                                            <td><input disabled={!props.podeEditar} key={index} type="text" value={item.valor} className="hover:bg-gray-200 form-input p-2 border w-full" /></td>
                                        </tr>
                                    </tbody>
                                ))

                                }
                            </table>

                            {!props.pedido && (
                                <div className=" mt-8 flex mx-4">
                                    <div className="relative w-full">
                                        {sugestoes.length > 0 && (
                                            <ul className="absolute bg-white border w-full mt-1 rounded shadow">
                                                {sugestoes.map((item, index) => (
                                                    <li key={index} onClick={() => handleSelected(item)} className="p-2 hover:bg-gray-200 cursor-pointer">{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                        <input value={inputValue} onChange={handleChange} type="text" className="p-2 border rounded-l-lg w-full" placeholder="Adicionar Itens ao Pedido" />
                                    </div>
                                    <button className="p-4 bg-red-600 hover:bg-red-700 rounded-r-lg"><FaPlus color="white" /></button>
                                </div>
                            )}
                        </div>

                        {!props.pedido && (
                            <button className="p-4 bg-red-600 hover:bg-red-700 text-white rounded font-bold self-end my-4">Criar Pedido</button>)}
                        {props.pedido && props.podeEditar && (
                            <button className="p-4 bg-red-600 hover:bg-red-700 text-white rounded font-bold self-end my-4">Atualizar Pedido</button>)}
                    </div>

                </div>
            </div>

        </div>
    )

}