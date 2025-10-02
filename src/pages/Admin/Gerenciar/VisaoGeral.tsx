import { FiUser, FiActivity, FiUsers, FiLayers } from "react-icons/fi";

export default function VisaoGeral() {

    const stats = [
        { label: "Pedidos", value: 204, icon: FiActivity },
        { label: "Clientes", value: 120, icon: FiUser },
        { label: "Cardápios", value: 12, icon: FiUsers },
        { label: "Pratos", value: 56, icon: FiLayers },
    ];


    return (
        <div className="flex w-full flex-col">
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

            <div className="flex flex-row p-4 gap-4">
                <div className="bg-white rounded-xl shadow w-full h-60">
                    <div className="p-4 text-gray-700 font-bold">
                        Visão Geral
                    </div>
                </div>
                <div className="bg-red-500 w-1/2 rounded-xl shadow-sm">
                    <div className="p-4 text-white font-bold">
                        Últimos Pedidos
                    </div>
                </div>
            </div>

        </div>
    )
}