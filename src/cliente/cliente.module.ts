import { forwardRef, Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { DatabaseModule } from 'src/database/database.module';
import { clienteProviders } from './cliente.providers';
import { PedidosModule } from 'src/pedidos/pedidos.module';

@Module({
  imports: [DatabaseModule,],
  controllers: [ClienteController],
  providers: [...clienteProviders ,ClienteService],
})
export class ClienteModule {}
