import { IsNumber, IsString } from "class-validator"
import { Carrinho } from "src/carrinho/entities/carrinho.entity"

export class CreateClienteDto {
    @IsString()
    nome:string

    @IsString()
    sobrenome?: string
    
    @IsString()
    email?:string

    @IsString()
    senha?:string

    @IsString()
    endereco?:string

    @IsNumber()
    telefone?:number
    
    
}
