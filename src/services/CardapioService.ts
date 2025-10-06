import axios from "axios";
import type { Cardapio } from "../types/types";

export const SERVER = "http://localhost:3000";

export class CardapioService {

    async criarCardapio(nome: string){
        try {
            const response = await axios.post(`${SERVER}/cardapio`,{
                nome
            });
            return response.data
        } catch (error) {
            console.error("Erro ao criar Cardápio: " + error)
        }
    }

    async buscarCardapio(id: number){
        try{
            const response = await axios.get(`${SERVER}/cardapio${id}`,{

            });
            return response.data
        } catch(err){
            console.error("Erro: " + err);
        }
    }

    async buscarTodosCardapio(): Promise<Cardapio[]>{
        try{
            const response = await axios.get(`${SERVER}/cardapio`,{
            });
            const lista: Cardapio[] = response.data;

            const listaConvertida: Cardapio[] = lista.map((item) => ({
                ...item,
                data: new Date(item.data)
            }));

            return listaConvertida
        } catch(err){
            console.error("Erro: " + err);
            return []
        }
    }

}