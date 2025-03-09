import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhoprodutoService } from './carrinhoproduto.service';

describe('CarrinhoprodutoService', () => {
  let service: CarrinhoprodutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrinhoprodutoService],
    }).compile();

    service = module.get<CarrinhoprodutoService>(CarrinhoprodutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
