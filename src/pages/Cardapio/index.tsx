import { useState } from "react";
import ModalPrato from "../../components/ModalAdicionarEditarPrato";
import { CardapioService } from "../../services/CardapioService";
import SimpleModal from "../../components/SimpleModal";

export interface Ingredientes {
  id?: number;
  nome: string;
}

export interface Prato {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  ingredientes?: Ingredientes[];
}

export interface Cardapio {
  nome: string;
}

export default function Cardapio() {
  const services = new CardapioService();

  const imagemBackground = "https://blog.simpliza.com.br/wp-content/uploads/2023/10/montar-cardapio-para-restaurante-self-service.png"

  const [pratos, setPratos] = useState<Prato[]>([
    {
      id: 1, nome: "Opção 1", valor: 10.00, descricao: "Descrição do prato 1", ingredientes: [{ id: 1, nome: "Ingrediente 1" }, { id: 2, nome: "Ingrediente 2" }]
    },
    { id: 2, nome: "Opção 2", valor: 15.00, descricao: "Descrição do prato 2", ingredientes: [{ id: 3, nome: "Ingrediente 3" }, { id: 4, nome: "Ingrediente 4" }] },
    { id: 3, nome: "Opção 3", valor: 20.00, descricao: "Descrição do prato 3", ingredientes: [{ id: 5, nome: "Ingrediente 5" }, { id: 6, nome: "Ingrediente 6" }] }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pratoEditando, setPratoEditando] = useState<Prato | null>(null);
  const [pratoSelecionado, setPratoSelecionado] = useState<number | null>(null);
  const [cardapio, setCardapio] = useState<Cardapio | null>({ nome: "Cardápio padrão" });

  const [nomeCardapio, setNomeCardapio] = useState<string>('Nome do cardapio');
  const [isModalCardapioOpen, setIsModalCardapioOpen] = useState(true);

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

  const salvarPrato = (prato: Prato) => {
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

  const removerPrato = (pratoId: number | null) => {
    setPratos((prev) => prev.filter((p) => p.id !== pratoId));
    setPratoSelecionado(null);
  }

  const adicionarCardapio = async () => {
    const response = await services.criarCardapio(nomeCardapio);
    return response;
  }


  const atualizarCardapio = async () => {

  }

  return (
    <div className="min-h-screen flex flex-col">

      <div
        className="bg-cover bg-center h-60 flex items-end"
        style={{
          backgroundImage:
            `url('${imagemBackground}')`,
        }}
      >
        <div className="p-4 mx-4 bg-opacity-40 from-yellow-300 bg-gradient-to-t to-yellow-500 rounded-t-3xl">
          <h1 className="text-4xl font-bold text-white font-bebas">Configure o Cardápio do dia</h1>
          <p className="text-gray-100">Adicione, edite ou remova pratos do cardápio.</p>
        </div>
      </div>

      {/* BOTOES DE ACOES */}
      <div className="flex w-full bg-yellow-300 py-4 justify-end gap-4 px-4">
        <button onClick={atualizarCardapio} className="bg-yellow-500 hover:bg-yellow-600 border border-yellow-600 text-white shadow font-bold py-2 px-4 rounded">
          Atualizar Cardápio
        </button>

        <button onClick={() => setIsModalCardapioOpen(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Criar novo Cardápio
        </button>

      </div>

      {/* CONTENT TABELA E CONFIGURACOES */}
      <div className="h-screen bg-yellow-50 w-5/6 max-w-screen-xl mt-10 mx-auto rounded flex shadow-lg border-4 border-yellow-300">
        <div className="w-4/5 overflow-y-auto">

          <table className="w-full border-collapse shadow-lg">
            <thead className="bg-gray-200 border-b-2 border-gray-500">
              <tr className="text-gray-700">
                <th className="text-left px-4 py-2">Prato</th>
                <th className="text-left px-4 py-2">Descrição</th>
                <th className="text-left px-4 py-2">Preço</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pratos.map(prato => (
                <tr className={`cursor-pointer ${pratoSelecionado === prato.id ? "bg-yellow-300" : ""}`} key={prato.id} onClick={() => setPratoSelecionado(prato.id)}>
                  <td className="border-t px-4 py-2">{prato.nome}</td>
                  <td className="border-t px-4 py-2">{prato.descricao}</td>
                  <td className="border-t px-4 py-2">R$ {prato.valor.toFixed(2).replace(".", ",")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-1/5 bg-yellow-300 h-full flex flex-col items-center gap-2 py-2 px-4">
          <h2 className="font-bold text-white mb-10 text-xl" >{cardapio?.nome.toUpperCase()}</h2>

          <button onClick={abrirModalAdicionar} className="w-full shadow-md border bg-yellow-500 border border-yellow-600 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
            Adicionar Prato
          </button>

          <button onClick={() => abrirModalEditar(pratoSelecionado)} className="w-full shadow-md border border-yellow-600 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
            Editar Prato
          </button>

          <button onClick={() => removerPrato(pratoSelecionado)} className="w-full shadow-md border border-red-600 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Remover Prato
          </button>
        </div>
      </div>


      <ModalPrato isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pratoEditando={pratoEditando} onSave={salvarPrato} />
      <SimpleModal isOpen={isModalCardapioOpen} onClose={() => setIsModalCardapioOpen(false)} title="Adicionar Cardápio" propriedades={[nomeCardapio]} onCreate={adicionarCardapio} />

      <div className="h-20 mt-10 bg-red-600 flex items-center justify-center">

      </div>

    </div>
  );
}
