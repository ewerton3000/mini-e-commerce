import { PartialType } from '@nestjs/swagger';
import { CreateCarrinhoprodutoDto } from './create-carrinhoproduto.dto';

export class UpdateCarrinhoprodutoDto extends PartialType(CreateCarrinhoprodutoDto) {}
