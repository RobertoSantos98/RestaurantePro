import { useEffect, useState } from "react";
import type { Ingredientes } from "../../../types/types";
import ModalEditEstoque from "../Edit/ModalEditEstoque";
import { EstoqueService } from "../../../services/EstoqueService";


export default function Estoque() {
    const [ingredientes, setIngredientes]= useState<Ingredientes[]>();
    const [ingredienteEditando, setIngredienteEditando]= useState<Ingredientes>();

    const [modalOpen, setModalOpen] = useState<boolean>(true)

    useEffect(()=> {
        const estoqueSevice = new EstoqueService()

        const buscarEstoque = async () => {
            const response = await estoqueSevice.BuscarEstoque();
            setIngredientes(response);
        }

        buscarEstoque();
    },[])

    return (
        <div className="m-4">
            <div className="bg-white w-full">
                <div className="bg-red-500 text-white p-2 font-bold rounded-t-xl flex justify-between items-center">
                    <h1>Gerenciar Estoque</h1>
                    <button onClick={() => { setModalOpen(true); setIngredienteEditando(undefined) }} className="bg-yellow-300 hover:bg-yellow-400 p-2 font-bold rounded border ">
                        Adicionar
                    </button>
                </div>

                <div>
                    {ingredientes ?
                    (<table className="w-full">
                        <thead>
                            <tr className="bg-gray-400 text-white">
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Nome</th>
                                <th className="p-2 text-left">Quantidade</th>
                            </tr>
                        </thead>
                        {ingredientes?.map((i, index)=> (
                            <tr key={index}>
                                <td className="p-2">{i.id}</td>
                                <td className="p-2">{i.nome}</td>
                                <td className="p-2">{i.quantidade}</td>
                            </tr>
                        ))}

                    </table>) 
                    : (
                        <div>NAda Encontrado</div>
                    )}
                </div>

            </div>

            {modalOpen && (
                <ModalEditEstoque ingredienteId={null} onClose={() => setModalOpen(false)} />
            )}
        </div>
    )
}