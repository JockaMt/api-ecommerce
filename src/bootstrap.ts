import { Logger, type INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupSwagger from './config/swagger.config';

export async function createNestApp(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);
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

    Logger.log('Aplicação Nest inicializada', 'Bootstrap');

    return app;
}