import { useEffect, useState } from "react"
import type { Cardapio } from "../../../types/types";
import Skeleton from "../../../components/Skeleton";
import { CardapioService } from "../../../services/CardapioService";
import ModalEditCardapio from "../Edit/ModalEditCardapio";


export default function GerenciarCardapio() {
    const [filtrar, setFiltrar] = useState("");
    const [cardapio, setCardapio] = useState<Cardapio[] | undefined>(undefined);
    const [cardapioSelecionado, setCardapioSelecionado] = useState<Cardapio | undefined>();
    const [modalOpen, setModalOpen] =useState<boolean>(false);

    useEffect(() => {
        const cardapioService = new CardapioService();
        const buscarCardapio = async () => {
            const response = await cardapioService.buscarTodosCardapio();
            console.log(response);
            setCardapio(response);
        }
        buscarCardapio();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow m-4  h-screen">
            <div className="bg-red-500 rounded-t-xl text-white">
                <h1 className="p-2 font-bold">Gerenciar Cardápios</h1>
                <div className="p-2 gap-2 flex flex-col">
                    <p>Procurar por: </p>
                    <div className="flex justify-around items-center">
                        <label className="text-white">Cardápio:
                            <input type="text" value={filtrar} onChange={(e) => setFiltrar(e.target.value)} className="p-2 text-black ml-2 rounded " />
                        </label>
                        <label>Data:
                            <input type="date" className="text-black ml-2 rounded p-2" />
                        </label>
                        <button className="bg-yellow-400 p-2 rounded font-bold ">Buscar</button>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto">
                {cardapio === undefined ? (
                    <div className="p-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} className="h-8 w-full mb-2" />
                        ))}
                    </div>
                ) : cardapio.length > 0 ? (
                    <table className="border-b py-2 w-full">
                        <thead className="border-gray-200">
                            <tr className="bg-gray-300 text-left">
                                <th className="py-2 px-2">ID</th>
                                <th className="py-2 px-2">Nome</th>
                                <th className="py-2 px-2">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cardapio.map((data) => (
                                <tr onClick={() => [setModalOpen(true), setCardapioSelecionado(data)]} key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-2 px-2">{data.id}</td>
                                    <td className="py-2 px-2">{data.nome}</td>
                                    <td className="py-2 px-2">
                                        {data.data.toLocaleDateString()}, {data.data.toLocaleTimeString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="p-4 text-gray-500">Nenhum cardápio encontrado.</p>
                )}
            </div>

            {modalOpen && (<ModalEditCardapio cardapio={cardapioSelecionado} podeEditar={true} onClose={() => setModalOpen(false)}/>)}
        </div>
    )
}