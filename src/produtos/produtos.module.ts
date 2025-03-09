import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { produtosProviders } from './produtos.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Carrinhoproduto } from 'src/carrinhoproduto/entities/carrinhoproduto.entity';

@Module({
  imports: [DatabaseModule,TypeOrmModule.forFeature([Carrinhoproduto])],
  controllers: [ProdutosController],
  providers: [...produtosProviders , ProdutosService],
  exports:[ProdutosService]
})
export class ProdutosModule {}
