
import type { Pedido } from "../pages/Pedidos";

export default function PedidoComponent({ pedido }: { pedido: Pedido }) {
    return (
        <div className={`bg-white p-4 rounded-2xl shadow mb-4 w-auto sm:w-80 md:w-96 lg:w-1/4 ${pedido.impresso ? "" : "border-2 border-red-500"} flex flex-col gap-2 hover:shadow-2xl transition-all`}>
            <h2 className="text-xl font-bold">{pedido.nome}</h2>
            <p className="text-gray-600">{pedido.endereco}</p>
            <p className="text-gray-800">{pedido.prato.nome}</p>
            <p className="text-gray-800">{pedido.quantidade}</p>
            <p className="text-gray-600">{pedido.opcional}</p>
            <p className="text-gray-600">{pedido.data.toLocaleTimeString()}</p>
            <p className="text-gray-800 text-3xl font-bold">{pedido.valor.toFixed(2)}</p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded font-bold hover:bg-yellow-600 w-full max-w-80">Pedido Em Preparo</button>
                <button className={`bg-${pedido.impresso ? "green" : "red"}-500 text-white px-4 py-2 rounded font-bold hover:bg-${pedido.impresso ? "green" : "yellow"}-600 w-full max-w-80`}>
                    {pedido.impresso ? "Impresso" : "Forçar Impressão"}
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded font-bold hover:bg-green-600 w-full max-w-80">Pedido Enviado</button>
            </div>
        </div>
    );
}