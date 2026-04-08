# API Ecommerce

API em NestJS para um SaaS de e-commerce multi-tenant.

Estado atual: base administrativa para cadastro e listagem de tenants, com documentacao Swagger habilitada.

## Stack

- Node.js + NestJS 11
- TypeScript
- class-validator / class-transformer
- Swagger via @nestjs/swagger
- Prisma instalado (ainda nao integrado no fluxo HTTP atual)

## Arquitetura Atual

Fluxo principal implementado no modulo admin:

Controller -> Service -> Use Case -> Repository

Arquivos principais:

- src/app.module.ts
- src/main.ts
- src/config/swagger.config.ts
- src/modules/admin/controllers/admin.controller.ts
- src/modules/admin/controllers/tenant.contoller.ts
- src/modules/admin/services/admin.service.ts
- src/modules/admin/use-cases/create-tenant.use-case.ts
- src/modules/admin/repositories/tenant.repository.ts
- src/modules/admin/dto/create-tenant.dto.ts

## Rotas Disponiveis

Base URL local: http://localhost:3000

1. GET /admin
- Retorna metadados do modulo admin e rotas expostas.

2. GET /admin/tenants
- Lista tenants cadastrados.

3. POST /admin/tenants
- Cria um novo tenant.

Exemplo de body:

```json
{
	"name": "Template Store",
	"themeName": "PRO",
	"metaTitle": "Template Store | E-commerce Base",
	"metaDescription": "Seu e-commerce premium pronto para vendas.",
	"phone": "5582991245437",
	"phoneDisplay": "(82) 99124-5437",
	"instagram": "@suamarca",
	"whatsappMessage": "Ola, gostaria de saber mais os produtos!",
	"footerDescription": "Sua loja de demonstracao definitiva para atrair clientes.",
	"footerNotice": "Feito com paixao. Envio para todo o Brasil."
}
```

## Swagger

Swagger habilitado em:

- http://localhost:3000/docs

Configuracao em src/config/swagger.config.ts.

## Como Rodar

```bash
npm install
npm run start:dev
```

Ou em modo normal:

```bash
npm run start
```

## Scripts Uteis

```bash
npm run build
npm run lint
npm run test
npm run test:e2e
npm run test:cov
```

## Observacoes Importantes

- O repositorio de tenants atual esta em memoria (array local), sem persistencia real.
- Prisma ja esta no projeto, mas a camada HTTP ainda nao usa banco de dados.
- O arquivo tenant.contoller.ts possui typo no nome do arquivo (contoller). O codigo funciona, mas o ideal e padronizar para tenant.controller.ts.
