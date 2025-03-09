import { PartialType } from '@nestjs/swagger';
import { CreateCarrinhoDto } from './create-carrinho.dto';
import { IsDate, IsDecimal, IsNumber } from 'class-validator';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { UpdateDateColumn } from 'typeorm';

export class UpdateCarrinhoDto extends PartialType(CreateCarrinhoDto) {

   
    @UpdateDateColumn()
    dataAtualizada:Date
}
