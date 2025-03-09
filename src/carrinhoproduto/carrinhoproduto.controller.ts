import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrinhoprodutoService } from './carrinhoproduto.service';
import { CreateCarrinhoprodutoDto } from './dto/create-carrinhoproduto.dto';
import { UpdateCarrinhoprodutoDto } from './dto/update-carrinhoproduto.dto';

@Controller('carrinhoproduto')
export class CarrinhoprodutoController {
  constructor(private readonly carrinhoprodutoService: CarrinhoprodutoService) {}

  @Post()
  create(@Body() createCarrinhoprodutoDto: CreateCarrinhoprodutoDto) {
    return this.carrinhoprodutoService.create(createCarrinhoprodutoDto);
  }

  @Post('add')
  async addProdutoToCarrinho(
    @Body('carrinhoId') carrinhoId: number,
    @Body('produtoId')  produtoId: number,
    @Body('quantidade') quantidade:number,
  ){
    return await this.carrinhoprodutoService.addProdutoTOcarrinho(carrinhoId,produtoId,quantidade)
  }
   
  //Endpoint para obter todos os carrinhos e seus produtos
  @Get('carrinhos')
  async getAllCarrinhos(){
    return await this.carrinhoprodutoService.findAllCarrinhos()
  } 

  //Endpoint para obter um dos carrinhos por id
  @Get('carro/:CarrinhoId')
  async getCarrinhoById(@Param('carrinhoId') carrinhoId: number){
    return await this.carrinhoprodutoService.findCarrinhoById(carrinhoId)
  }

  @Get()
  findAll() {
    return this.carrinhoprodutoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrinhoprodutoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarrinhoprodutoDto: UpdateCarrinhoprodutoDto) {
    return this.carrinhoprodutoService.update(+id, updateCarrinhoprodutoDto);
  }
  @Patch('atualizar/:produtoId')
  async updateProdutoQuantity(
    @Param('produtoId') produtoId: number,
    @Body('quantidade') quantidade: number,
  ){
    //Chama o método no serviço para atualizar a quantidade do produto
    await this.carrinhoprodutoService.updateProdutoQuantity(produtoId, quantidade)
    return{message: 'Quantidade do produto atualizada com sucesso'}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrinhoprodutoService.remove(+id);
  }
  @Delete(':carrinhoId/produtos/:produtoId')
  async deleteProduto(
    @Param('carrinhoId') carrinhoId: number,
    @Param('produtoId') produtoId: number
  ) 
  {
    return await this.carrinhoprodutoService.removeProdutoFromCarrinho(carrinhoId,produtoId)
  }
}

