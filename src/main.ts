import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import setupSwagger from './config/swagger.config';
import process from 'process';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  setupSwagger(app);

  Logger.log(`Iniciando servidor...`, 'Bootstrap');
  Logger.log(`Servidor rodando em  http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Docs rodando em http://localhost:${port}/docs`, 'Bootstrap');

  await app.listen(port);
}
bootstrap();
