import { PartialType } from '@nestjs/swagger';
import { CreatePagamentoDto } from './create-pagamento.dto';
import { IsString } from 'class-validator';

export class UpdatePagamentoDto extends PartialType(CreatePagamentoDto) {
    @IsString()
    forma_de_pagamento:string

    @IsString()
    descricao:string

    @IsString()
    status:string
}
