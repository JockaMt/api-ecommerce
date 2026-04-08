import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function setupSwagger(app) {
    const config = new DocumentBuilder()
        .setTitle('API E-commerce')
        .setDescription('Documentação da API multi-tenant')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
}