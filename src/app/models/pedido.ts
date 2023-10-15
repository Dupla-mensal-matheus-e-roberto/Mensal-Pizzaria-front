import { Cliente } from "./cliente"

export class Pedido {
    idPedido!: number
    dataDoPedido!: Date
    status!: string
    cliente!: Cliente
}
