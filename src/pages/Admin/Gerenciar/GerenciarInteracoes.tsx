import { useEffect, useState } from "react";
import Skeleton from "../../../components/Skeleton";
import { InteracoesServices } from "../../../services/InteracoesServices";
import { FaTrash } from "react-icons/fa";

interface interacoes {
    data: Date;
    descricao: string | null;
    id: number;
    idUsuario: number;
    cardapioId: number;
    usuario: {
        id: number;
        nome: string;
        email: string;
        senha: string;
    };
    cardapio: {
        data: Date;
        id: number;
        nome: string;
    };
}

export default function GerenciarInteracoes() {

    const [interacoes, setInteracoes] = useState<interacoes[]>();

    useEffect(() => {

        const interacoesService = new InteracoesServices();

        const buscarInteracoes = async () => {
            const lista = await interacoesService.buscarTodasInteracoes();
            setInteracoes(lista);
        }

        buscarInteracoes();
    }, []);


    return (
        <div className="bg-white rounded-xl shadow p-4 my-4 h-screen overflow-y-auto">
            <h1>Gerenciar Pedidos</h1>
            {interacoes !== undefined ? (
                <table className="border-b py-2 w-full">
                    <thead className="border-gray-200">
                        <tr className="bg-gray-300 text-left">
                            <th className="py-2 px-2">ID</th>
                            <th className="py-2 px-2">Usuário</th>
                            <th className="py-2 px-2">Descrição</th>
                            <th className="py-2 px-2">Mensagem</th>
                        </tr>
                    </thead>

                    <tbody>
                        {interacoes.map((data) => (
                            <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-2 px-2">{data.id}</td>
                                <td className="py-2 px-2">{data.usuario.nome}</td>
                                <td className="py-2 px-2">{data.descricao}</td>
                                <td className="py-2 px-2">{data.cardapio.nome}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            ) : (
                <div>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-8 w-full mb-2" />
                    ))}
                </div>
            )}
        </div>
    )
}