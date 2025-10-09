import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { PratoService } from "../../../services/PratoService"
import type { Prato } from "../../../types/types";

interface ModalEditPratoProps {
    idPrato?: number,
    podeEditar: boolean,
    onClose: () => void
}

export default function ModalEditPrato(props: ModalEditPratoProps) {

    const [formData, setFormData] = useState<Prato>({
        id: 0,
        descricao: "",
        nome: "Nada",
        valor: 0,
        idCardapio: 0,
        ingredientes: [
            {
                pratoId: 0,
                ingredientesId: 0
            }
        ]
    });

    const buscarPrato = async (id: number) => {
        const pratoService = new PratoService();

        const prato = await pratoService.BuscarPratoPorId(id)
        setFormData(prato);
    }


    useEffect(() => {
        if (props.idPrato) {
            buscarPrato(props.idPrato);
        }
    }, [props.idPrato])

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="w-4/5 h-4/5 bg-white rounded-xl">
                <div className="bg-red-500 text-white font-bold p-2 rounded-t-xl flex justify-between items-center">
                    <h1>Adicionar Prato</h1>
                    <button onClick={(e) => { e.stopPropagation(); props.onClose() }} className="hover:bg-red-700 p-2 rounded-full transition">
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <div>
                    <h1>{formData.nome}</h1>
                </div>
            </div>
        </div>
    )
}