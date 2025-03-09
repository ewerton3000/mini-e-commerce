import { PartialType } from '@nestjs/swagger';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsDate, IsDecimal, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
    @IsDate()
    datadopedido:Date

    @IsString()
    status:string

    @IsNumber()
    @Min(0)
    @Max(99999.99)
    preco:number
}
