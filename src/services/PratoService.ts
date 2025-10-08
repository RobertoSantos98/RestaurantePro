import axios from "axios";
import { SERVER } from "./PedidoService";
import type { Prato } from "../types/types";

export class PratoService {
    async BuscarTodosPratos(paginaAtual: number, limit: number) {
        try {
            const response = await axios.get(`${SERVER}/prato/${paginaAtual}/${limit}`);

            return {
                data: response.data.data,
                total: response.data.total,
                page: response.data.page,
                totalPages: response.data.totalPages
            }

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async BuscarPratoPorId(id: number): Promise<Prato> {
        try {
            const response = await axios.get(`${SERVER}/prato/${id}`);

            return response.data

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }


}