import { useEffect, useState } from "react"
import type { Prato } from "../../../types/types";
import Skeleton from "../../../components/Skeleton";
import { PratoService } from "../../../services/PratoService";
import ModalError from "../../../components/ModalError";
import ModalEditPrato from "../Edit/ModalEditPrato";


export default function GerenciarPratos() {
    const [pratos, setPratos] = useState<Prato[] | undefined>();
    const [pratoEditando, setPratoEditando] = useState<Prato>();
    const [message, setMessage] = useState<string>();
    const [ modalOpen, setModalOpen ] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPagina, setTotalPaginas] = useState(1);
    const limite = 10;


    const handlePratos = async (pagina: number) => {
        try {
            const pratoService = new PratoService();
            const response = await pratoService.BuscarTodosPratos(pagina, limite);
            setPratos(response.data);
            setTotalPaginas(response.totalPages);
        } catch (error) {
            setMessage((error as Error).message);
        }
    }

    useEffect(() => {
        handlePratos(paginaAtual)
    }, [paginaAtual])

    return (
        <div className="m-4 bg-white rounded-xl">
            <div>
                <div className="bg-red-500 text-white rounded-t-xl">
                    <div className="flex justify-between items-center p-2">
                        <h1 className="font-bold">Gerenciar Pratos</h1>
                        <button className="bg-yellow-300 hover:bg-yellow-400 p-2 font-bold rounded border ">
                            Adicionar Prato
                        </button>
                    </div>
                </div>

                <div>
                    {pratos !== undefined ? (
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-400 text-white">
                                    <th className="p-2 text-left ">ID</th>
                                    <th className="p-2 text-left ">Nome</th>
                                    <th className="p-2 text-left ">Valor</th>
                                    <th className="p-2 text-left ">Cardapio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pratos?.map((item, index) => (
                                    <tr onClick={() => setPratoEditando(item)} className="hover:bg-gray-100" key={index}>
                                        <td className="p-2">{item.id}</td>
                                        <td className="p-2">{item.nome}</td>
                                        <td className="p-2">{item.valor}</td>
                                        <td className="p-2">{item.idCardapio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <Skeleton key={index} className="h-8 m-4" />
                            ))}
                        </div>
                    )
                    }
                </div>

                <div className="flex justify-center items-center gap-4 py-4">
                    <button
                        onClick={() => setPaginaAtual((p) => p - 1)}
                        disabled={paginaAtual === 1}
                        className={`p-2 font-bold text-white rounded ${paginaAtual === 1 ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 cursor-pointer"} `}>
                        Anterior
                    </button>
                    <span className="font-bold">
                        {paginaAtual} de {totalPagina}
                    </span>
                    <button
                        onClick={() => setPaginaAtual((p) => p + 1)}
                        disabled={paginaAtual === totalPagina}
                        className={`p-2 font-bold text-white rounded ${paginaAtual === totalPagina ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 cursor-pointer"} `}
                    >
                        Próxima
                    </button>

                </div>

            </div>

            {modalOpen && (
                <ModalEditPrato idPrato={2} podeEditar={true} onClose={()=>setModalOpen(false)} />
            )}

            {message && (
                <ModalError message={message} setMensagemErro={() => setMessage("")} />
            )}
        </div>
    )
}