import { useState, useEffect } from "react";
import type { Prato } from "../pages/Cardapio";
import { FaPlus, FaTrash } from "react-icons/fa";
import type  { Ingredientes }  from "../pages/Cardapio";

interface ModalPratoProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (prato: Prato) => void;
    pratoEditando?: Prato | null; // se existir, abre para edição
}

export default function ModalPrato({ isOpen, onClose, onSave, pratoEditando }: ModalPratoProps) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState<number>(0);
    const [ingredientes, setIngredientes] = useState<Ingredientes[]>([]);
    const [novoIngrediente, setNovoIngrediente] = useState<string>();

    // Se for edição, preencher os campos com o prato existente
    useEffect(() => {
        if (pratoEditando) {
            setNome(pratoEditando.nome);
            setValor(pratoEditando.valor);
            setDescricao(pratoEditando.descricao);
        } else {
            setNome("");
            setValor(0);
            setDescricao("");
        }
    }, [pratoEditando]);

    if (!isOpen) return null; // não renderiza se não estiver aberto

    const salvar = () => {
        const novoPrato: Prato = {
            id: pratoEditando ? pratoEditando.id : Date.now(),
            nome,
            descricao,
            valor,
            ingredientes: pratoEditando?.ingredientes || []
        };
        onSave(novoPrato);
        onClose();
    };

    const adicionarIngrediente = () => {
        if (novoIngrediente !== undefined && novoIngrediente !== null) {
            const novoIng: Ingredientes = { nome: novoIngrediente};
            setIngredientes([...ingredientes, novoIng]);
            setNovoIngrediente("");
        }
    }

    const deletarIngrediente = (ing: Ingredientes) => {
        return () => {
            setIngredientes(ingredientes.filter(i => i !== ing));
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-1/2 max-w-4xl">
                <h2 className="text-xl font-bold mb-4">{pratoEditando ? "Editar Prato" : "Novo Prato"}</h2>

                <input
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Nome do prato"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <textarea
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <input
                    type="number"
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Preço"
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                />

                <div className="max-h-40 overflow-y-auto rounded border mb-2">
                    <label className="block font-semibold bg-gray-100 border-b border-gray-400 px-2 py-1">Ingredientes:</label>
                    {
                        ingredientes.map((ing, index) => (
                            <div key={index} className="flex justify-between items-stretch border-b border-gray-300 ">
                                <p className="px-2 py-1 flex-1 flex items-center">{ing.nome}</p>
                                <button onClick={deletarIngrediente(ing)} className="bg-red-100 hover:bg-red-300 px-2"><FaTrash size={12} color="red"/></button>
                            </div>
                        ))
                    }


                </div>

                <div className="flex items-center mb-4 mt-4">
                    <input
                        className="w-full border p-2 rounded-l-lg mb-2"
                        placeholder="Adicionar Ingrediente"
                        value={novoIngrediente}
                        onChange={(e) => setNovoIngrediente(e.target.value)}
                    />
                    <button onClick={adicionarIngrediente} className="bg-gray-300 hover:bg-gray-400 py-3 px-4 rounded-r-lg mb-2">
                        <FaPlus size={18} color="" />
                    </button>
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                        Cancelar
                    </button>
                    <button onClick={salvar} className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
