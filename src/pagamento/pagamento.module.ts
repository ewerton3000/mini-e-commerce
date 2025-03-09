import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { DatabaseModule } from 'src/database/database.module';
import { pagamentoProviders } from './pagamento.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PagamentoController],
  providers: [...pagamentoProviders , PagamentoService],
})
export class PagamentoModule {}
