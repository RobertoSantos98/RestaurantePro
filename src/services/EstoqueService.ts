import type { Ingredientes } from "../types/types";
import { SERVER } from "./PedidoService";
import axios from "axios";


export class EstoqueService {

    async BuscarEstoquePorId(id: number): Promise<Ingredientes> {
        try {
            const response = await axios.get(`${SERVER}/ingrediente/${id}`);

            return response.data

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async BuscarEstoque(): Promise<Ingredientes[]> {
        try {
            const response = await axios.get(`${SERVER}/ingrediente/`);

            return response.data

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    
    async criarIngrediente(data: Ingredientes): Promise<Ingredientes> {

        const novo = {
            nome: data.nome,
            quantidade: data.quantidade
        }

        try {
            const response = await axios.post(`${SERVER}/ingrediente/`, novo );
            return response.data

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}