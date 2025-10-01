

export default function VisaoGeral() {
    return (
        <div className="flex flex-row w-full gap-4">
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
    )
}