import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ClienteModule } from './cliente/cliente.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { CarrinhoprodutoModule } from './carrinhoproduto/carrinhoproduto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from './database/database.providers';
import { utilDB } from 'teste';
import { PedidoprodutoModule } from './pedidoproduto/pedidoproduto.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //Serve para INSERIR AS VARIAVEIS DE AMBIENTE DO ARQUIVO .ENV
    }),
    TypeOrmModule.forRootAsync({
     
      useFactory: async () => {

        const dataSource =  await databaseProviders[0].useFactory()
        return {
          type: 'mysql',
          host: 'localhost',
          port: utilDB.dbPort,
          username: process.env.user,
          password: process.env.password,
          database: process.env.database,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,

          dataSource: dataSource,
        }
      }
    })
    , ProdutosModule, PedidosModule, ClienteModule, CategoriaModule, CarrinhoModule, PagamentoModule, CarrinhoprodutoModule, PedidoprodutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
