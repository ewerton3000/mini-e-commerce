import { PartialType } from '@nestjs/swagger';
import { CreateProdutoDto } from './create-produto.dto';
import { IsDecimal, IsNumber, IsString, Max, Min } from 'class-validator';
import { Categoria } from 'src/categoria/entities/categoria.entity';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
    @IsString()
    nome:string
    
    @IsString()
    descricao:string

    @IsNumber()
    quantidade: number

    @IsNumber()
    @Min(0)
    @Max(99999.99)
    preco:number

    Categoria?: Categoria
}
