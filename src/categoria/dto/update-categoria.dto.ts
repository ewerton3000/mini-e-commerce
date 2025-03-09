import { PartialType } from '@nestjs/swagger';
import { CreateCategoriaDto } from './create-categoria.dto';
import { IsNumber, IsString } from 'class-validator';
import { Categoria } from '../entities/categoria.entity';
import { Produto } from 'src/produtos/entities/produto.entity';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    @IsString()
    nome:string

    @IsString()
    descricao:string


}
