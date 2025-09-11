import { useState } from "react";
import type { Prato } from "../Cardapio";
import PedidoComponent from "../../components/PedidoComponent";

export interface Pedido {
  nome: string;
  endereco: string;
  prato: Prato;
  opcional: string;
  quantidade: number;
  valor: number;
  data: Date;
  impresso: boolean;
}

export default function Pedidos() {

  const [option, setOption] = useState<string>("Todos");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      nome: "Mazaroppi",
      endereco: "Rua A, 123",
      prato: { id: 1, nome: "Opção 1", preco: 10.00, descricao: "Descrição do prato 1", ingredientes: [{ id: 1, nome: "Ingrediente 1" }, { id: 2, nome: "Ingrediente 2" }] },
      opcional: "Sem cebola",
      quantidade: 2,
      valor: 20.00,
      data: new Date(),
      impresso: true
    },
    {
      nome: "João Valis",
      endereco: "Rua B, 456",
      prato: { id: 2, nome: "Opção 2", preco: 15.00, descricao: "Descrição do prato 2", ingredientes: [{ id: 3, nome: "Ingrediente 3" }, { id: 4, nome: "Ingrediente 4" }] },
      opcional: "Sem pimenta",
      quantidade: 1,
      valor: 15.00,
      data: new Date(),
      impresso: true
    },
    {
      nome: "Joelma Siqueira",
      endereco: "Rua C, 789",
      prato: { id: 3, nome: "Opção 3", preco: 20.00, descricao: "Descrição do prato 3", ingredientes: [{ id: 5, nome: "Ingrediente 5" }, { id: 6, nome: "Ingrediente 6" }] },
      opcional: "Troque a batata-frita por salada",
      quantidade: 3,
      valor: 60.00,
      data: new Date(),
      impresso: false
    },
    {
      nome: "Maria Oliveira",
      endereco: "Rua D, 321",
      prato: { id: 4, nome: "Opção 4", preco: 25.00, descricao: "Descrição do prato 4", ingredientes: [{ id: 7, nome: "Ingrediente 7" }, { id: 8, nome: "Ingrediente 8" }] },
      opcional: "Sem queijo",
      quantidade: 2,
      valor: 50.00,
      data: new Date(),
      impresso: false
    }
  ]);

  return (
    <div className="ml-8 bg-gray-100 flex">
      <div className="w-full">
        <div className="flex justify-between items-center pl-4">
          <h1 className="text-3xl font-bold my-4">Pedidos</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-red-600 text-white px-4 py-2 rounded-l-lg hover:bg-red-500 transition font-bold text-xl justify-center items-center"
          >
            {menuOpen ? ">" : "<"}
          </button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {pedidos.map((pedido, index) => (
            <PedidoComponent key={index} pedido={pedido} />
          ))}
        </div>
      </div>

      <div
        className={`bg-red-600 text-white transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? "w-80" : "w-0"
          }`}
      >
        <h2 className="font-bold text-xl text-center">Mostrar apenas</h2>
        <button className="border-b-2 border-red-400 hover:bg-red-500 text-white py-2 w-full">Todos</button>
        <button className="border-b-2 border-red-400 hover:bg-red-500 text-white py-2 w-full">Para Envio</button>
        <button className="border-b-2 border-red-400 hover:bg-red-500 text-white py-2 w-full">Não Impressos</button>
        <button className="border-b-2 border-red-400 hover:bg-red-500 text-white py-2 w-full">Enviados</button>
      </div>

      <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl rounded shadow-md">
        <p>Esta é uma área de destaque para informações importantes.</p>
      </div>
    </div>
  );
}
