# 🛒 API Ecommerce

Uma API em NestJS para um SaaS de e-commerce multi-tenant.

## 🚀 Estrutura do Projeto

```text
src/
├── app.module.ts                     # Modulo raiz da aplicacao
├── main.ts                           # Bootstrap da API
├── config/
│   └── swagger.config.ts             # Configuracao do Swagger
├── database/
│   └── prisma/
│       ├── schema.prisma             # Schema do banco
│       ├── migrations/               # Migracoes Prisma
│       └── generated/                # Cliente gerado do Prisma
└── modules/
		├── admin/
		│   ├── controllers/
		│   │   └── admin.controller.ts
		│   ├── services/
		│   └── admin.module.ts
		├── tenant/
		│   ├── controllers/
		│   │   ├── tenant.controller.ts
		│   │   ├── user-tenant.controller.ts
		│   │   └── set-tenant-theme.controller.ts
		│   ├── dto/
		│   ├── repositories/
		│   ├── services/
		│   ├── use-cases/
		│   └── tenant.module.ts
		├── products/
		│   ├── controllers/
		│   ├── dto/
		│   ├── repositories/
		│   ├── services/
		│   └── use-cases/
		└── prisma/
				├── prisma.module.ts
				└── service/
```

## 🛠️ Tecnologias

- NestJS 11
- TypeScript
- Prisma ORM + SQLite
- class-validator / class-transformer
- Swagger via @nestjs/swagger
- Jest + Supertest

## 📦 Funcionalidades

- ✅ Endpoint de status/metadata administrativo
- ✅ CRUD de tenants no contexto admin
- ✅ Consulta de tenant no contexto de usuario
- ✅ Criacao/atualizacao de tema por tenant
- ✅ Consulta de tema por tenant
- ✅ Criacao e listagem de produtos por tenant
- ✅ Documentacao Swagger em /docs

## 🧱 Arquitetura

O fluxo principal segue o padrao:

Controller -> Service -> Use Case -> Repository

Com separacao por modulos (admin, tenant, products, prisma) para manter regras de negocio e acesso a dados desacoplados.

## 🔌 Rotas Disponiveis

Base URL local: http://localhost:3000

### Admin

- GET /admin
- GET /admin/tenants
- POST /admin/tenants
- PUT /admin/tenants/:id
- DELETE /admin/tenants/:id

### Tenant

- GET /tenant
- POST /:tenantId/theme
- GET /:tenantId/theme

### Produtos

- GET /products/:tenantId/:name
- GET /products/:tenantId
- GET /products/:tenantId/:category
- POST /products

Exemplo de body para criar tenant:

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

## 📚 Swagger

- URL: http://localhost:3000/docs
- Configuracao: src/config/swagger.config.ts

## 🚀 Como Executar

```bash
# Instalar dependencias
npm install

# Desenvolvimento
npm run start:dev

# Modo normal
npm run start
```

## 🧪 Scripts Uteis

```bash
npm run build
npm run lint
npm run test
npm run test:e2e
npm run test:cov
```

## 🔧 Configuracao

- Path alias: @/* -> ./src/*
- TypeScript com strictNullChecks habilitado
- Swagger com Bearer Auth configurado no DocumentBuilder

## 📁 Observacoes Importantes

- O projeto utiliza Prisma com schema e migracoes em src/database/prisma.
- O endpoint GET /tenant atualmente esta com @Param sem segmento de rota, o que pode exigir ajuste para GET /tenant/:id ou uso de header/claim.
- Existem duas rotas de GET em products com assinatura semelhante (:tenantId/:name e :tenantId/:category); dependendo da ordem e da regra esperada, pode haver ambiguidade de match.
