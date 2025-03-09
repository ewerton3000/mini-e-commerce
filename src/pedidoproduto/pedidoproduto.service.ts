import { Inject, Injectable } from '@nestjs/common';
import { CreatePedidoprodutoDto } from './dto/create-pedidoproduto.dto';
import { UpdatePedidoprodutoDto } from './dto/update-pedidoproduto.dto';
import { Pedidoproduto } from './entities/pedidoproduto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoprodutoService {
  constructor(
    @Inject('PEDIDOPRODUTO_REPOSITORY')
    private pedidoprodutoRepository: Repository<Pedidoproduto>,
  ){}
  create(createPedidoprodutoDto: CreatePedidoprodutoDto) {
    return this.pedidoprodutoRepository.save(createPedidoprodutoDto)
  }

  findAll() {
    return this.pedidoprodutoRepository.find()
  }

  findOne(id: number) {
    return this.pedidoprodutoRepository.findOne({where: {id} })
  }

  update(id: number, updatePedidoprodutoDto: UpdatePedidoprodutoDto) {
    return this.pedidoprodutoRepository.update(id, updatePedidoprodutoDto)
  }

  remove(id: number) {
    return this.pedidoprodutoRepository.delete(id)
  }
}
