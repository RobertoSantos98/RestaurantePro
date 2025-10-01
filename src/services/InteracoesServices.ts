import axios from "axios";

export const SERVER = "http://localhost:3000";

export class InteracoesServices {

    async buscarTodasInteracoes() {
        const response = await axios.get(`${SERVER}/interacoes`);
        return response.data;
    }
 
}