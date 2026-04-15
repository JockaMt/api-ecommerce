import { Logger } from '@nestjs/common';
import process from 'process';
import { createNestApp } from './bootstrap';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const app = await createNestApp();

  Logger.log(`Servidor rodando em  http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Docs rodando em http://localhost:${port}/docs`, 'Bootstrap');

  await app.listen(port);
}
bootstrap();
