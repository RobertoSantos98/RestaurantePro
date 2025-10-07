import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai";
import type { Cardapio } from "../../../types/types";

interface ModalEditCardapioProps {
    cardapio?: Cardapio,
    podeEditar: boolean,
    onClose: () => void
}

export default function ModalEditCardapio(props: ModalEditCardapioProps) {
    const [formData, setFormData] = useState<Cardapio>({
        id: 0,
        data: new Date(),
        nome: "",
        pratos: [{
            id: 0,
            descricao: "",
            nome: "",
            valor: 0,
            idCardapio: 0,
        }]
    })

    useEffect(() => {
        if (props.cardapio) {
            setFormData(props.cardapio)
        }
    }, [props.cardapio])

    return (
        <div className="fixed bg-black bg-opacity-50 flex inset-0 justify-center items-center">
            <div className="bg-white w-4/5 h-4/5 flex flex-col rounded-xl">
                <div className="bg-red-600 rounded-t-xl p-4 text-white font-bold justify-between flex items-center">
                    <h1>Editar Cardápio</h1>
                    <button onClick={props.onClose} className="hover:bg-red-700 rounded-full p-2">
                        <AiOutlineClose />
                    </button>
                </div>

                <div className="overflow-y-auto">
                    <div className="p-4 flex flex-col">

                        <div className="border rounded p-4 flex flex-col mb-4">
                            {props.cardapio && (<label className="mb-4">ID:
                                <input type="text" value={formData.id} className="w-full bg-gray-100 p-2 rounded border" disabled />
                            </label>)}
                            <label className="mb-4">Nome:
                                <input type="text" value={formData.nome} className="w-full bg-gray-100 p-2 rounded border" />
                            </label>
                            <label className="mb-4">Data:
                                <input type="date" value={formData.data.toISOString().split("T")[0]} className="w-full bg-gray-100 p-2 rounded border" />
                            </label>
                        </div>
                        <div className="border mb-4">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-300 text-left">
                                        <th className="p-2">ID</th>
                                        <th className="p-2">Nome</th>
                                        <th className="p-2">Valor</th>
                                        <th className="p-2">Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.pratos.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-100 border-b">
                                            <td className="p-2">{item.id}</td>
                                            <td className="p-2">{item.nome}</td>
                                            <td className="p-2">{item.valor}</td>
                                            <td className="p-2">{item.descricao}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    {!props.cardapio && (
                        <button className="bg-red-500 hover:bg-red-600 p-2 rounded text-white font-bold m-4 self-end shadow-md">Criar Cardápio</button>
                    )}
                    {props.cardapio && props.podeEditar && (
                        <button className="bg-green-500 hover:bg-green-600 p-2 rounded font-bold self-end m-4 text-white border shadow border-gray-500">Editar Cardápio</button>
                    )}
                    </div>

                </div>
            </div>
        </div>
    )
}