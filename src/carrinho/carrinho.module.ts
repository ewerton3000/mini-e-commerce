import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';
import { DatabaseModule } from 'src/database/database.module';
import { carrinhoProviders } from './carrinho.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrinho } from './entities/carrinho.entity';
import { Produto } from 'src/produtos/entities/produto.entity';


@Module({
  imports: [DatabaseModule,TypeOrmModule.forFeature([Carrinho, Produto])],
  controllers: [CarrinhoController],
  providers: [...carrinhoProviders , CarrinhoService]
})
export class CarrinhoModule {
  
}
