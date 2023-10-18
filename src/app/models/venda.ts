import { Funcionario } from "./funcionario"
import { Pedido } from "./pedido"

export class Venda {
    idVenda!: number
    funcionario!: Funcionario
    tipoPagamento!: string
    pedido!: Pedido
    tipoEntrega!: string
}
