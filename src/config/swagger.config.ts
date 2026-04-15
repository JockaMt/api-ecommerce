import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function setupSwagger(app) {
    const config = new DocumentBuilder()
        .setTitle('API E-commerce')
        .setDescription(
            'Documentação da API multi-tenant.\n\n' +
            'Resolucao de tenant por host:\n' +
            '- Desenvolvimento: http://loja1.localhost:3000\n' +
            '- Producao: https://loja1.seudominio.com\n\n' +
            'No Swagger UI, use o header x-forwarded-host para simular o host quando necessario.'
        )
        .setVersion('1.0')
        .addServer('/', 'Servidor atual')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
}