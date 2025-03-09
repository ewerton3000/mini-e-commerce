import { forwardRef, Module } from '@nestjs/common';
import { CarrinhoprodutoService } from './carrinhoproduto.service';
import { CarrinhoprodutoController } from './carrinhoproduto.controller';
import { DatabaseModule } from 'src/database/database.module';
import { carrinhoprodutoProviders } from './carrinhoproduto.providers';
import { PedidosModule } from 'src/pedidos/pedidos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Carrinhoproduto } from './entities/carrinhoproduto.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { ProdutosService } from 'src/produtos/produtos.service';
import { ProdutosModule } from 'src/produtos/produtos.module';

@Module({
  imports: [DatabaseModule ,TypeOrmModule.forFeature([Carrinhoproduto,Produto,Carrinho]),
  forwardRef(() =>ProdutosModule)],
  controllers: [CarrinhoprodutoController],
  providers: [...carrinhoprodutoProviders , CarrinhoprodutoService ],
})
export class CarrinhoprodutoModule {}
