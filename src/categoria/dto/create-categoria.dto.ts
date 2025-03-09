import { IsNumber, IsString } from "class-validator"
import { Produto } from "src/produtos/entities/produto.entity"

export class CreateCategoriaDto {
    @IsString()
    nome?:string

    @IsString()
    descricao?:string

}
