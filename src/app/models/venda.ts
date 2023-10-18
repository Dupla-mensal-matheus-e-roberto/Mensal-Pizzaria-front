import { Pedido } from "./pedido"

export class Venda {
    idVenda!: number
    tipo_pagamento!: string
    pedido!: Pedido
    tipoEntrega!: string
}
