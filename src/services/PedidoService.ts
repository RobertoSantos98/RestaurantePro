
import axios from "axios";
import type { Pedido } from "../types/types";

export const SERVER = "http://localhost:3000";

export class PedidoService {
    async buscarTodosPedido(): Promise<Pedido[]> {
        try {
            const response = await axios.get(`${SERVER}/pedido/`,{
                headers: {
                    "Accept":"application/json"
                }
            });
            const lista: Pedido[] = response.data;

            const listaConvertida = lista.map((item) => (
                {...item,
                data: new Date(item.data)}
            ))
        return listaConvertida;
        } catch (error) {
            console.log("Erro ao buscar pedidos:", error);
            return [];
        }
    }

    async atualizarPedido(id: string, status: string, clienteId: string): Promise<Pedido | null> {
        const atualizar = {
            clienteId: Number(clienteId),
            status: status
        }
        try {
            const response = await axios.put(`${SERVER}/pedido/${id}`, atualizar, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const dataAtualizada = {
                ...response.data,
                data: new Date(response.data.data) // Converte a string de volta para Date
            }
            return dataAtualizada;
        } catch (error) {
            console.log("Erro ao atualizar pedido:", error);
            return null;
        }
    }


}
