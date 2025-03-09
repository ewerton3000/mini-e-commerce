import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { DatabaseModule } from 'src/database/database.module';
import { categoriaProviders } from './categoria.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriaController],
  providers: [...categoriaProviders,CategoriaService],
})
export class CategoriaModule {}
