import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidoprodutoService } from './pedidoproduto.service';
import { CreatePedidoprodutoDto } from './dto/create-pedidoproduto.dto';
import { UpdatePedidoprodutoDto } from './dto/update-pedidoproduto.dto';

@Controller('pedidoproduto')
export class PedidoprodutoController {
  constructor(private readonly pedidoprodutoService: PedidoprodutoService) {}

  @Post()
  create(@Body() createPedidoprodutoDto: CreatePedidoprodutoDto) {
    return this.pedidoprodutoService.create(createPedidoprodutoDto);
  }

  @Get()
  findAll() {
    return this.pedidoprodutoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoprodutoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoprodutoDto: UpdatePedidoprodutoDto) {
    return this.pedidoprodutoService.update(+id, updatePedidoprodutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoprodutoService.remove(+id);
  }
}
