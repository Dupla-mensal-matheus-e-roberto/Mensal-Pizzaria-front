import { Cliente } from "./cliente"
import { Produto } from "./produto"

export class Pedido {
    idPedido!: number
    dataDoPedido!: Date
    produtos!: Produto[]
    status!: string
    cliente!: Cliente
}
