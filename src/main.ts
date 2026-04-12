import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import setupSwagger from '@/config/swagger.config';
import process from 'process';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow non-browser requests and same-origin tools.
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} nao permitido pelo CORS`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  setupSwagger(app);

  Logger.log(`Iniciando servidor...`, 'Bootstrap');
  Logger.log(`Servidor rodando em  http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Docs rodando em http://localhost:${port}/docs`, 'Bootstrap');

  await app.listen(port);
}
bootstrap();
