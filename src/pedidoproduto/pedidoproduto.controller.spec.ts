import { Test, TestingModule } from '@nestjs/testing';
import { PedidoprodutoController } from './pedidoproduto.controller';
import { PedidoprodutoService } from './pedidoproduto.service';

describe('PedidoprodutoController', () => {
  let controller: PedidoprodutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoprodutoController],
      providers: [PedidoprodutoService],
    }).compile();

    controller = module.get<PedidoprodutoController>(PedidoprodutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
