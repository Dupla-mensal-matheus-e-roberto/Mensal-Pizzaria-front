import { Funcionario } from "./funcionario"
import { Pedido } from "./pedido"

export class Venda {
    idVenda!: number
    tipoPagamento!: string
    pedido!: Pedido
    tipoEntrega!: string
    funcionario!: Funcionario
}
