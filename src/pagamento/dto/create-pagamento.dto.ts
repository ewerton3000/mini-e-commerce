import { IsString } from "class-validator";

export class CreatePagamentoDto {
    @IsString()
    forma_de_pagamento:string

    @IsString()
    descricao:string

    @IsString()
    status:string
}
