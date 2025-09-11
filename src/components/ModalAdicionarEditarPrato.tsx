import React, { useState, useEffect } from "react";
import type { Prato } from "../pages/Cardapio";

interface ModalPratoProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (prato: Prato) => void;
    pratoEditando?: Prato | null; // se existir, abre para edição
}

export default function ModalPrato({ isOpen, onClose, onSave, pratoEditando }: ModalPratoProps) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState<number>(0);
    const [ingredientes, setIngredientes] = useState<string[]>([]);

    // Se for edição, preencher os campos com o prato existente
    useEffect(() => {
        if (pratoEditando) {
            setNome(pratoEditando.nome);
            setPreco(pratoEditando.preco);
            setDescricao(pratoEditando.descricao);
        } else {
            setNome("");
            setPreco(0);
            setDescricao("");
        }
    }, [pratoEditando]);

    if (!isOpen) return null; // não renderiza se não estiver aberto

    const salvar = () => {
        const novoPrato: Prato = {
            id: pratoEditando ? pratoEditando.id : Date.now(),
            nome,
            descricao,
            preco,
            ingredientes: pratoEditando?.ingredientes || []
        };
        onSave(novoPrato);
        onClose();
    };

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
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Ingredientes (separados por vírgula)"
                    value={ingredientes.join(", ")}
                    onChange={(e) => setIngredientes(e.target.value.split(", ").map(ing => ing.trim()))}
                />

                <input
                    type="number"
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(Number(e.target.value))}
                />

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
