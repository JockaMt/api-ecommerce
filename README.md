# API Ecommerce

API em NestJS para e-commerce multi-tenant, com Prisma + SQLite e documentacao Swagger.

## Visao Geral

- Framework: NestJS 11
- Linguagem: TypeScript
- Banco: SQLite (via Prisma)
- Validacao: class-validator / class-transformer
- Documentacao: Swagger em /docs

## Estrutura Atual

```text
src/
├── app.module.ts
├── main.ts
├── config/
│   └── swagger.config.ts
├── database/
│   └── prisma/
│       ├── schema.prisma
│       ├── migrations/
│       └── generated/
└── modules/
		├── admin/
		│   ├── controllers/
		│   ├── services/
		│   └── admin.module.ts
		├── tenant/
		│   ├── controllers/
		│   │   ├── tenant.controller.ts
		│   │   ├── user-tenant.controller.ts
		│   │   └── tenant-theme.controller.ts
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
		│   ├── use-cases/
		│   └── product.module.ts
		└── prisma/
				├── prisma.module.ts
				└── service/
```

## Modelos Prisma (schema.prisma)

Atualmente o schema contempla:

- Tenant
- Product
- Theme
- Hero
- Feature
- User
- contactFields

Esses modelos suportam os blocos principais de conteudo do storefront por tenant (dados da loja, tema, hero, features e produtos).

## Arquitetura

Fluxo padrao por modulo:

Controller -> Service -> Use Case -> Repository

Obs.: no modulo de products, o fluxo atual segue Controller -> Service -> Repository.

## Rotas

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

### Products

- GET /:tenantId/products
- GET /:tenantId/products/:name
- GET /:tenantId/products/:category
- POST /:tenantId/products

## Exemplos de Payload

### Criar tenant

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

### Criar produto

```json
{
	"tenantId": "tenant-uuid",
	"name": "Topo de Bolo Personalizado",
	"category": "lembrancas",
	"description": "Produto personalizado em impressao 3D",
	"price": 39,
	"priceOriginal": 49,
	"badge": "Mais pedido",
	"image": "https://example.com/image.jpg",
	"rating": 4.9,
	"reviews": 163,
	"stock": 45,
	"highlight": true
}
```

## Ambiente

Variaveis esperadas:

- DATABASE_URL
- PORT (opcional, padrao 3000)

## Como Rodar

```bash
npm install
npm run start:dev
```

Swagger:

- http://localhost:3000/docs

## Prisma Workflow

Com o schema em src/database/prisma/schema.prisma e prisma.config.ts na raiz:

```bash
npx prisma migrate dev --name nome_da_migracao
npx prisma generate
```

## Scripts

```bash
npm run build
npm run lint
npm run test
npm run test:e2e
npm run test:cov
```

## Observacoes Importantes

- A rota GET /tenant hoje esta sem parametro de id no path e pode precisar de ajuste conforme a estrategia de identificacao do tenant.
- Em products, as rotas GET /:tenantId/products/:name e GET /:tenantId/products/:category possuem mesmo padrao de URL e podem gerar ambiguidade.
