import { forwardRef, Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { pedidoProviders } from './pedidos.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Carrinhoproduto } from 'src/carrinhoproduto/entities/carrinhoproduto.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Pedido } from './entities/pedido.entity';
import { Pedidoproduto } from 'src/pedidoproduto/entities/pedidoproduto.entity';
import { PedidoprodutoModule } from 'src/pedidoproduto/pedidoproduto.module';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Carrinho,Carrinhoproduto,Produto,Pedido,Pedidoproduto,Cliente]),
forwardRef(() => PedidoprodutoModule)],
  controllers: [PedidosController],
  providers: [...pedidoProviders , PedidosService],
})
export class PedidosModule {}
