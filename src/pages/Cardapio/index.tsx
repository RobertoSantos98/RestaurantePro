import { useState } from "react";
import ModalPrato from "../../components/ModalAdicionarEditarPrato";

interface Ingredientes {
  id: number;
  nome: string;
}

export interface Prato {
  id: number;
  nome: string;
  preco: number;
  ingredientes: Ingredientes[];
  descricao: string;
}

export default function Cardapio() {

  const imagemBackground = "https://blog.simpliza.com.br/wp-content/uploads/2023/10/montar-cardapio-para-restaurante-self-service.png"

  const [pratos, setPratos] = useState<Prato[]>([
    {
      id: 1, nome: "Opção 1", preco: 10.00, descricao: "Descrição do prato 1", ingredientes: [{ id: 1, nome: "Ingrediente 1" }, { id: 2, nome: "Ingrediente 2" }]
    },
    { id: 2, nome: "Opção 2", preco: 15.00, descricao: "Descrição do prato 2", ingredientes: [{ id: 3, nome: "Ingrediente 3" }, { id: 4, nome: "Ingrediente 4" }] },
    { id: 3, nome: "Opção 3", preco: 20.00, descricao: "Descrição do prato 3", ingredientes: [{ id: 5, nome: "Ingrediente 5" }, { id: 6, nome: "Ingrediente 6" }] }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pratoEditando, setPratoEditando] = useState<Prato | null>(null);
  const [pratoSelecionado, setPratoSelecionado] = useState<number | null>(null);

  const abrirModalAdicionar = () => {
    setPratoEditando(null);
    setIsModalOpen(true);
  }

  const abrirModalEditar = (pratoSelecionado: number | null) => {
    if (pratoSelecionado !== null) {
      const prato = pratos.find((p) => p.id === pratoSelecionado);
      if (prato) {
        setPratoEditando(prato);
        setIsModalOpen(true);
      }
    }
  };

  const salvarPrato = (prato: Prato)  => {
    setPratos((prev) => {
      const existe = prev.find((p) => p.id === prato.id);
      if (existe) {
        // edição
        return prev.map((p) => (p.id === prato.id ? prato : p));
      }
      // adição
      return [...prev, prato];
    });
    setPratoSelecionado(null);
  };

  return (
    <div className="h-full ">

      <div
        className="bg-cover bg-center h-40 flex items-end"
        style={{
          backgroundImage:
            `url('${imagemBackground}')`,
        }}
      >
        <div className="p-4 mx-4 bg-opacity-90 bg-yellow-300 rounded-t-3xl">
          <h1 className="text-3xl font-bold text-white">Configure o Cardápio do dia</h1>
          <p className="text-gray-100">Adicione, edite ou remova pratos do cardápio.</p>
        </div>
      </div>
      <div className="flex w-full bg-yellow-300 py-4 justify-center gap-4">
        <button onClick={abrirModalAdicionar} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          Adicionar Prato
        </button>

        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          Remover Prato
        </button>

        <button onClick={() => abrirModalEditar(pratoSelecionado)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          Editar Prato
        </button>

        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Atualizar Cardápio
        </button>

      </div>

      <table className="w-4/5 border-collapse mx-auto mt-10 shadow-lg">
        <thead className="bg-gray-200 border-b-2 border-gray-500">
          <tr className="text-gray-700">
            <th className="text-left px-4 py-2">Prato</th>
            <th className="text-left px-4 py-2">Descrição</th>
            <th className="text-left px-4 py-2">Preço</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {pratos.map(prato => (
            <tr className={`cursor-pointer ${pratoSelecionado === prato.id ? "bg-yellow-200" : ""}`} key={prato.id} onClick={() => setPratoSelecionado(prato.id)}>
              <td className="border-t px-4 py-2">{prato.nome}</td>
              <td className="border-t px-4 py-2">{prato.descricao}</td>
              <td className="border-t px-4 py-2">R$ {prato.preco.toFixed(2).replace(".", ",")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalPrato isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pratoEditando={pratoEditando} onSave={salvarPrato} />
    </div>
  );
}
