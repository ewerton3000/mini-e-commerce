import { IsDate, IsDecimal, IsNumber, IsString, Max, Min } from "class-validator"
import { CreatePedidoprodutoDto } from "src/pedidoproduto/dto/create-pedidoproduto.dto"
import { Pedidoproduto } from "src/pedidoproduto/entities/pedidoproduto.entity"

export class CreatePedidoDto {
    @IsDate()
    datadopedido:Date

    @IsString()
    status:string

    @IsNumber()
    @Min(0)
    @Max(99999.99)
    preco:number


}
