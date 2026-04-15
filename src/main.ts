import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import setupSwagger from '@/config/swagger.config';
import process from 'process';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID'],
    credentials: false,
  });

  setupSwagger(app);

  Logger.log(`Iniciando servidor...`, 'Bootstrap');
  Logger.log(`Servidor rodando em  http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Docs rodando em http://localhost:${port}/docs`, 'Bootstrap');

  await app.listen(port);
}
bootstrap();
