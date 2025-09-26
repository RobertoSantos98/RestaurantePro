import axios from "axios";
import { API_URL } from "../config/server";

export class CardapioService {

    async criarCardapio(nome: string){
        try {
            const response = await axios.post(`${API_URL}/cardapio`,{
                nome
            });
            return response.data
        } catch (error) {
            console.error("Erro ao criar Cardápio: " + error)
        }
    }

}