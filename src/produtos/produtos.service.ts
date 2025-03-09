import { Inject, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  findPedido(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject('PRODUTO_REPOSITORY')
    private produtoRepository : Repository<Produto>,
  ) {}
    create(createProdutoDto: CreateProdutoDto) {
    return this.produtoRepository.save(createProdutoDto);
  }

  findAll() {
    return this.produtoRepository.find();
  }

  findOne(id: number) {
    return this.produtoRepository.findOne({ where : {id} });
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return this.produtoRepository.update(id , updateProdutoDto)
  }

  remove(id: number) {
    return this.produtoRepository.delete(id);
  }
}
