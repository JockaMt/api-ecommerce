import { Logger, type INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupSwagger from './config/swagger.config';

function normalizeOrigin(origin: string): string | null {
    try {
        return new URL(origin).origin;
    } catch {
        return null;
    }
}

function isTenantSubdomainOrigin(origin: string): boolean {
    try {
        const url = new URL(origin);
        const host = url.hostname.toLowerCase();

        if (host === 'localhost' || host.endsWith('.localhost')) {
            return true;
        }

        const baseDomain = process.env.TENANT_BASE_DOMAIN?.trim().toLowerCase();
        if (baseDomain && (host === baseDomain || host.endsWith(`.${baseDomain}`))) {
            return true;
        }

        return false;
    } catch {
        return false;
    }
}

function isAllowedOrigin(origin: string, allowedOrigins: string[]): boolean {
    const normalizedOrigin = normalizeOrigin(origin);
    if (!normalizedOrigin) {
        return false;
    }

    return allowedOrigins.some((allowedOrigin) => {
        const normalizedAllowedOrigin = normalizeOrigin(allowedOrigin);
        if (normalizedAllowedOrigin && normalizedAllowedOrigin === normalizedOrigin) {
            return true;
        }

        return isTenantSubdomainOrigin(normalizedOrigin);
    });
}

export async function createNestApp(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);
    const httpAdapter = app.getHttpAdapter();
    const httpInstance = httpAdapter.getInstance() as { set?: (key: string, value: unknown) => void };
    httpInstance.set?.('trust proxy', 1);

    const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

    app.enableCors({
        origin: (origin, callback) => {
            if (!origin) {
                callback(null, true);
                return;
            }

            if (isAllowedOrigin(origin, corsOrigins)) {
                callback(null, true);
                return;
            }

            callback(new Error(`Origin not allowed by CORS: ${origin}`), false);
        },
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Forwarded-Host', 'X-Tenant-ID'],
        credentials: false,
    });

    setupSwagger(app);

    Logger.log('Aplicação Nest inicializada', 'Bootstrap');

    return app;
}