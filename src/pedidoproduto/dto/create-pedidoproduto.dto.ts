import { IsNumber } from "class-validator";
import { Produto } from "src/produtos/entities/produto.entity";

export class CreatePedidoprodutoDto {
    id?:number
    produto?:Produto
    @IsNumber()
    quantidade:number
    @IsNumber()
    precoUnitario:number
}
