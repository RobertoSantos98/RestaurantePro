import { useEffect, useState } from "react"
import type { Ingredientes } from "../../../types/types"
import { EstoqueService } from "../../../services/EstoqueService";
import ModalError from "../../../components/ModalError";
import { AiOutlineClose } from "react-icons/ai";

interface EstoqueProps {
    ingredienteId?: number | null,
    onClose: () => void
}

export default function ModalEditEstoque(props: EstoqueProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");

    const [formData, setFormData] = useState<Ingredientes>({
        id: 0,
        nome: "",
        quantidade: 0,
        pratos: []
    });

    const buscarEstoque = async (id: number) => {
        const estoqueService = new EstoqueService();
        try {
            const response = await estoqueService.BuscarEstoquePorId(id);
            setFormData(response);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const criarIngrediente = async () => {
        const estoqueService = new EstoqueService();
        try {
            const response = await estoqueService.criarIngrediente(formData);
            setFormData({
                id: 0,
                nome: "",
                quantidade: 0,
                pratos: []
            })
            setMessage("Criado com sucesso!: " + response)
        } catch (error) {
            setMessage((error as Error).message || "Erro ao adicionar ao estoque")
        }
    }

    useEffect(() => {
        if (props.ingredienteId) {
            buscarEstoque(props.ingredienteId)
        }
    }, [props.ingredienteId])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
            <div className="bg-white w-2/4 rounded-xl">
                <div className="bg-red-500 text-white p-2 rounded-t-xl flex justify-between items-center">
                    <h1>Adicionar Item no Estoque</h1>
                    <button className="hover:bg-red-700 rounded-full p-2" onClick={() => props.onClose()}>
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-2">
                    {props.ingredienteId && (<label className="">
                        Id:
                        <input value={formData.id} type="text" className="w-full p-2 bg-gray-100 rounded border" />
                    </label>)}
                    <label className="">
                        Nome:
                        <input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} type="text" className="w-full p-2 bg-gray-100 rounded border" />
                    </label>
                    <label className="">
                        Quantidade:
                        <input value={formData.quantidade} onChange={(e) => setFormData({ ...formData, quantidade: Number(e.target.value) })} type="number" className="w-full p-2 bg-gray-100 rounded border" />
                    </label>

                    {props.ingredienteId ? (
                        <button className="bg-yellow-300 p-2 font-bold self-end rounded text-gray-800 border border-gray-500 hover:bg-yellow-400">Editar</button>
                    ) : (
                        <button onClick={() => criarIngrediente()} className="bg-green-400 p-2 font-bold self-end rounded text-gray-800 border border-gray-500 hover:bg-green-500">Salvar</button>
                    )}
                </div>

            </div>

            {message && (
                <ModalError message={message} setMensagemErro={() => setMessage("")}  />
            )}
        </div>
    )
}