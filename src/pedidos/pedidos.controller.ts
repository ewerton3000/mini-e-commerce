import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, Query } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoClienteDto } from './dto/pedido-cliente.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Post(':carrinhoId')
  async criarPedidoDoCarrinho(@Param('carrinhoId') carrinhoId: number,clienteId:number) {
    try {
      const pedido = await this.pedidosService.criarPedidoDoCarrinho(carrinhoId,clienteId);
      return {
        pedido: pedido, //Executando o Método criarPedidoDoCarrinho e mostrando na resposta
        message: 'Pedido criado com sucesso a partir do carrinho!',
        
      };
    } catch (error) {
      throw new NotFoundException('Carrinho não encontrado ou erro ao criar o pedido.');
    }
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Get('detalhe/:id')
  async getPedido(@Param('id') id: number): Promise<any> {
    const pedido = await this.pedidosService.findPedido(id);
  
    return {
      id: pedido.id,
      status: pedido.status,
      datadopedido: pedido.datadopedido,
      valortotal: pedido.valortotal,
      cliente: {
        nome: pedido.cliente.nome,
        sobrenome: pedido.cliente.sobrenome,
      },
      produtos: pedido.pedidoProduto.map(item => ({
        nome: item.produto.nome,
        quantidade: item.quantidade,
        preco: item.produto.preco,
        
      })),
    };
  }
@Get('buscar/:id')
async buscarpedidopelocliente(@Param('id') id:number): Promise<any>{
  const pedido = await this.pedidosService.encontrarPedidosporcliente(id)
  
  return pedido
}


  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }

  @Patch(':id/produtos')
async atualizarProdutos(
  @Param('id') pedidoId: number,
  @Body() produtosAtualizados: { produtoId: number; quantidade: number }[],
) {
  if (!Array.isArray(produtosAtualizados)) {
    throw new BadRequestException('O corpo da requisição deve ser um array de produtos.');
  }

  return this.pedidosService.atualizarProdutosNoPedido(pedidoId, produtosAtualizados);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
