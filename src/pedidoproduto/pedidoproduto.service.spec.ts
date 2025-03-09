import { Test, TestingModule } from '@nestjs/testing';
import { PedidoprodutoService } from './pedidoproduto.service';

describe('PedidoprodutoService', () => {
  let service: PedidoprodutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidoprodutoService],
    }).compile();

    service = module.get<PedidoprodutoService>(PedidoprodutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
