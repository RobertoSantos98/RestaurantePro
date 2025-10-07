// enums.ts
export interface StatusPedido {
  PENDENTE: "PENDENTE";
  EM_PREPARACAO: "EM_PREPARACAO";
  SAIU_PARA_ENTREGA: "SAIU_ENTREGAR";
  ENTREGUE: "ENTREGUE";
  CANCELADO: "CANCELADO";
}

// types.ts
export interface Cliente {
  id: number;
  numeroTelefone: string;
  nome: string;
}

export interface ItemPedido {
  id: number;
  quantidade: number;
  valor: number;
  prato: Prato;
}

export interface Pedido {
  id: number;
  clienteId: number;
  data: Date; // ou Date se você converter
  opcional: string;
  status: "PENDENTE" | "EM_PREPARACAO" | "SAIU_ENTREGAR" | "ENTREGUE" | "CANCELADO"; // se houver mais status, adicione aqui
  itens: ItemPedido[];
  cliente: Cliente;
}

export interface Cardapio {
  id: number;
  data: Date;
  nome: string;
  pratos: Prato[]
}

export interface Prato {
  id: number;
  descricao: string;
  nome: string;
  valor: number;
  idCardapio: number;
}
