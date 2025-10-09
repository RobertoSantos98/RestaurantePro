import { useState } from "react";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth";
import { FiUser } from "react-icons/fi";
import VisaoGeral from "./Gerenciar/VisaoGeral";
import Gerenciar from "./Gerenciar/Gerenciar";
import GerenciarInteracoes from "./Gerenciar/GerenciarInteracoes";
import GerenciarCardapio from "./Gerenciar/GerenciarCardapio";
import GerenciarPratos from "./Gerenciar/GerenciarPratos";
import Estoque from "./Gerenciar/Estoque";


export default function Admin() {
    const { user } = useAuth();

    const [chatBotOption, setChatBotOption] = useState<boolean>(false);
    const [contentSelected, setContentSelected] = useState<string>("Visão Geral");

    const handleContent = (content: string) => {
        switch(content) {
            case "Visão Geral":
                return <VisaoGeral />;
            case "Gerenciar Pedidos":
                return <Gerenciar />;
            case "Interações":
                return <GerenciarInteracoes />
            case "Cardápios":
                return <GerenciarCardapio/>;
            case "Pratos":
                return <GerenciarPratos/>
            case "Estoque":
                return <Estoque/>
                
            default:
                return <VisaoGeral/>
        }
    }


    return (
        <div>

            <div className="bg-red-600 flex" >
                <div className="bg-white w-64 md:w-1/6 rounded-tr-3xl h-screen">
                    <div className="flex flex-col py-4 justify-center items-center">
                        <div className="bg-gray-200 rounded-full p-2">
                            <FiUser size={48} className="text-gray-700" />
                        </div>
                        <h1 className="text-xl font-bold p-4">Bem vindo, {user?.name}</h1>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold p-4">Menu</h2>
                        
                        <button onClick={() => setContentSelected("Visão Geral")} className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                            Início
                        </button>
                        <button onClick={() => setContentSelected("Cardápios")} className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                            Cardápios
                        </button>
                        <button onClick={() => setContentSelected("Pratos")} className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                            Pratos
                        </button>
                        <button onClick={() => setContentSelected("Gerenciar Pedidos")} className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                            Pedidos
                        </button>
                        <button onClick={() => setContentSelected("Gerenciar Clientes")} className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                            Clientes
                        </button>
                        <button onClick={() => setContentSelected("Gerenciar Funcionários")} className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                            Funcionários
                        </button>
                        <button onClick={() => setContentSelected("Interações")} className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                            Interações
                        </button>
                        <button onClick={() => setContentSelected("Estoque")} className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                            Estoque
                        </button>
                    </div>
                </div>

                <div className="w-5/6 bg-gray-100 h-screen overflow-y-auto">
                    <div className="bg-red-600 text-white px-4 flex flex-row items-center gap-4 pb-4">
                        <p className="font-bold">ChatBot:</p>
                        <p className="">{chatBotOption ? 'On' : 'Off'}</p>

                        <button className={`bg-red-500 hover:bg-red-700 text-white w-10 px-1 py-1 font-bold rounded-full flex transition-all ${chatBotOption ? 'justify-end' : 'justify-start'}`} onClick={() => setChatBotOption(!chatBotOption)}>
                            <div className={`rounded-full h-4 w-4 text-black ${chatBotOption ? 'bg-white' : 'bg-red-300'}`} />
                        </button>

                    </div>
                    <div className="">

                        {handleContent(contentSelected)}

                    </div>

                </div>


            </div>
            <Footer />
        </div>
    )
}