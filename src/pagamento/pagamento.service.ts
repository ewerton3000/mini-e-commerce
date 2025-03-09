import { Inject, Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';

@Injectable()
export class PagamentoService {
  constructor(
    @Inject ('PAGAMENTO_REPOSITORY')
    private pagamentoRepository: Repository<Pagamento>,
  ){}
  create(createPagamentoDto: CreatePagamentoDto) {
    return this.pagamentoRepository.save(createPagamentoDto);
  }

  findAll() {
    return this.pagamentoRepository.find();
  }

  findOne(id: number) {
    return this.pagamentoRepository.findOne({ where: {id} });
  }

  update(id: number, updatePagamentoDto: UpdatePagamentoDto) {
    return this.pagamentoRepository.update(id , updatePagamentoDto);
  }

  remove(id: number) {
    return this.pagamentoRepository.delete(id);
  }
}
