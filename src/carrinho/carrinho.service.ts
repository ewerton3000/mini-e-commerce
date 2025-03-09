import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';
import { Repository } from 'typeorm';
import { Carrinho } from './entities/carrinho.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/produtos/entities/produto.entity';

@Injectable()
export class CarrinhoService {
  constructor(
    @InjectRepository(Carrinho)
    private carrinhoRepository: Repository<Carrinho>,
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>
  ) {}
   

  create(createCarrinhoDto: CreateCarrinhoDto) {
    return this.carrinhoRepository.save(createCarrinhoDto)
  }

  findAll() {
    return this.carrinhoRepository.find()
  }

  findOne(id: number) {
    return this.carrinhoRepository.findOne({where: {id} })
  }

  update(id: number, updateCarrinhoDto: UpdateCarrinhoDto) {
    return this.carrinhoRepository.update(id, updateCarrinhoDto)
  }

  remove(id: number) {
    return this.carrinhoRepository.delete(id)
  }
}
