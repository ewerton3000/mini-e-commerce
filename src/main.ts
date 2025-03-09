import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Projeto-Mini-e-commerce')
  .setDescription('<h1>Criando um mini-e-commerce com produtos de várias categorias com REST API<h1>')
  .setVersion('1.0')
  .addTag('Exemplo com rotas abaixo')
  .build()
  app.useGlobalPipes(new ValidationPipe())
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api',app,document)

  await app.listen(process.env.APP_URL)
}
bootstrap();
