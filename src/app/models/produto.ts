import { Pizza } from "./pizza"

export class Produto {
    idProduto!: number;
    pizzas!: Pizza[];
    acompanhamentos!: string;
    preco!: number;
}
