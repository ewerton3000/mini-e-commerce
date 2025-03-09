import { PartialType } from '@nestjs/swagger';
import { CreatePedidoprodutoDto } from './create-pedidoproduto.dto';

export class UpdatePedidoprodutoDto extends PartialType(CreatePedidoprodutoDto) {}
