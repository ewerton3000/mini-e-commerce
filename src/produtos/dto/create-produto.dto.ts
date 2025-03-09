import { IsDecimal, IsNumber, IsString, Max, Min } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { OneToOne } from "typeorm";

export class CreateProdutoDto {
    @IsString()
    nome:string
    
    @IsString()
    descricao:string
    
    IsString
    @IsNumber()
    quantidade:number
    

    @IsNumber()
    @Min(0)
    @Max(99999.99)
    preco:number

    categoria?:Categoria
   
/*
    PedidoProduto?: PedidoProduto

    CarrinhoProduto?: CarrinhoProduto
    */
}
