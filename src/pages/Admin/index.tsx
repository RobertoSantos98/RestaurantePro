import { useAuth } from "../../hooks/useAuth";
import { FiUser, FiActivity, FiUsers, FiLayers } from "react-icons/fi";

export default function Admin() {
    const { user } = useAuth();

    const stats = [
        { label: "Pedidos", value: 204, icon: FiActivity },
        { label: "Clientes", value: 120, icon: FiUser },
        { label: "Cardápios", value: 12, icon: FiUsers },
        { label: "Pratos", value: 56, icon: FiLayers },
    ];


    return (
        <div className="bg-red-600 flex" >
            <div className="bg-white w-64 md:w-1/6 rounded-r-3xl h-screen">
                <div className="flex flex-col py-4 justify-center items-center">
                    <div className="bg-gray-200 rounded-full p-2">
                        <FiUser size={48} className="text-gray-700" />
                    </div>
                    <h1 className="text-xl font-bold p-4">Bem vindo, {user?.name}</h1>
                </div>
                <div>
                    <h2 className="text-lg font-bold p-4">Menu</h2>
                    <button className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                        Cardápios
                    </button>
                    <button className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                        Pratos
                    </button>
                    <button className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                        Pedidos
                    </button>
                    <button className="p-2 w-full hover:bg-red-500 hover:text-white font-bold text-gray-700 transition text-left">
                        Clientes
                    </button>
                </div>
            </div>

            <div className="w-5/6 bg-gray-100 h-screen overflow-y-auto">

                <div className="bg-red-600 w-full py-4 flex flex-row justify-around gap-4">
                    {stats.map(({ label, value, icon: Icon }) => (
                        <button
                            key={label}
                            className="text-white w-1/5 font-bold text-sm text-left py-6 px-4 rounded bg-red-500 hover:bg-red-700 transition"
                        >
                            <div className="flex flex-row gap-2 justify-between text-xl">
                                <Icon size={24} />
                                {value}
                            </div>
                            {label}
                        </button>
                    ))}
                </div>

                <div className="p-4">
                    <div className="flex flex-row w-full gap-4">
                        <div className="bg-white rounded-xl shadow w-full h-60">
                            <div className="p-4 text-gray-700 font-bold">
                                Visão Geral
                            </div>
                        </div>
                        <div className="bg-red-600 w-1/2 rounded-xl shadow-sm">
                            <div className="p-4 text-white font-bold">
                                Últimos Pedidos
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}