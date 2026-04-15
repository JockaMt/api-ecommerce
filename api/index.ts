import type { IncomingMessage, ServerResponse } from 'node:http';
import type { INestApplication } from '@nestjs/common';
import { createNestApp } from '../src/bootstrap';

let appPromise: Promise<INestApplication> | undefined;

async function getApp(): Promise<INestApplication> {
    if (!appPromise) {
        appPromise = createNestApp().then(async (app) => {
            await app.init();
            return app;
        });
    }

    return appPromise;
}

export default async function handler(
    req: IncomingMessage,
    res: ServerResponse,
): Promise<void> {
    const app = await getApp();
    const expressApp = app.getHttpAdapter().getInstance();

    return expressApp(req, res);
}
