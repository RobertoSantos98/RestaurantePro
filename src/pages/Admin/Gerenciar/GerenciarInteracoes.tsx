import { useEffect, useState } from "react";
import Skeleton from "../../../components/Skeleton";
import { InteracoesServices } from "../../../services/InteracoesServices";

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
    const [filtrar, setFiltrar] = useState<string>("");

    useEffect(() => {

        const interacoesService = new InteracoesServices();

        const buscarInteracoes = async () => {
            const lista = await interacoesService.buscarTodasInteracoes();
            setInteracoes(lista);
        }

        buscarInteracoes();
    }, []);


    return (
        <div className="bg-white rounded-xl shadow m-4  h-screen">
            <div className="bg-red-500 rounded-t-xl text-white">
                <h1 className="p-2 font-bold">Gerenciar Pedidos</h1>
                <div className="p-2 gap-2 flex flex-col">
                    <p>Procurar por: </p>
                    <div className="flex justify-around items-center">
                        <label className="text-white">Usuário:
                            <input type="text" value={filtrar} onChange={(e) => setFiltrar(e.target.value)} className="p-2 text-black ml-2 rounded " />
                        </label>
                        <label>Data: 
                            <input type="data" className="text-black ml-2 rounded p-2" />
                        </label>
                        <button className="bg-yellow-400 p-2 rounded font-bold ">Buscar</button>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto">
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
        </div>
    )
}