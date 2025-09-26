// enums.ts
export interface StatusPedido {
  PENDENTE: "PENDENTE";
  EM_PREPARACAO : "EM_PREPARACAO";
  SAIU_PARA_ENTREGA : "SAIU_ENTREGAR";
  ENTREGUE : "ENTREGUE";
  CANCELADO : "CANCELADO";
}

// types.ts
export interface Cliente {
  id: number;
  numeroTelefone: string;
  nome: string;
}

export interface ItemPedido {
  id: number;
  nome: string;
  quantidade: number;
  valor: number;
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
