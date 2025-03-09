import { forwardRef, Module } from '@nestjs/common';
import { PedidoprodutoService } from './pedidoproduto.service';
import { PedidoprodutoController } from './pedidoproduto.controller';
import { DatabaseModule } from 'src/database/database.module';
import { pedidoprodutoProviders } from './pedidoproduto.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedidoproduto } from './entities/pedidoproduto.entity';

@Module({
  imports: [DatabaseModule,TypeOrmModule.forFeature([Pedidoproduto]), forwardRef(() =>PedidoprodutoModule)],
  controllers: [PedidoprodutoController],
  providers: [...pedidoprodutoProviders, PedidoprodutoService],
  exports:[PedidoprodutoService]
})
export class PedidoprodutoModule {}
