import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhoprodutoController } from './carrinhoproduto.controller';
import { CarrinhoprodutoService } from './carrinhoproduto.service';

describe('CarrinhoprodutoController', () => {
  let controller: CarrinhoprodutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrinhoprodutoController],
      providers: [CarrinhoprodutoService],
    }).compile();

    controller = module.get<CarrinhoprodutoController>(CarrinhoprodutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
