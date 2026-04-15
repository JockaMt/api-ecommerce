# API E-commerce Multi-tenant

API em NestJS para e-commerce **multi-tenant**, com Prisma + SQLite, documentação Swagger e deploy em Vercel.

## 📋 Visão Geral

Sistema completo de e-commerce composto por:
- **API Backend** (este repositório): NestJS + Prisma + SQLite
- **Frontend**: Next.js 14 com TypeScript e Tailwind CSS

### Características principais

- ✅ **Multi-tenant**: Múltiplas lojas em uma única aplicação
- ✅ **Serverless**: Deploy na Vercel como funções serverless
- ✅ **Type-safe**: TypeScript em toda a stack
- ✅ **API Documentation**: Swagger automático em `/docs`
- ✅ **Validação robusta**: class-validator + class-transformer
- ✅ **Migrations**: Prisma com controle de versão

### Tech Stack

| Área | Tecnologia |
|------|-----------|
| Framework | NestJS 11 |
| Linguagem | TypeScript 5 |
| Banco de dados | SQLite (Prisma ORM) |
| Validação | class-validator, class-transformer |
| Documentação | Swagger/OpenAPI |
| Deploy | Vercel (serverless) |

## 🏗️ Arquitetura

### Padrão por Módulo

```
Controller → Service → Use Case/Repository → Database
```

**Exceção**: Módulo de Products segue `Controller → Service → Repository`

### Identificação de Tenant

O tenant é identificado **pelo host da requisição** através do middleware `TenantHostMiddleware`:
- Middleware extrai o tenant do host e o injeta no contexto da requisição
- Decorador `@CurrentTenant()` fornece o tenant context nos controllers
- Segurança: `tenantId` **não deve vir do cliente** (payload/header)

### Estrutura de Pastas

```text
src/
├── app.module.ts                      # Módulo raiz
├── bootstrap.ts                       # Setup compartilhado (local + serverless)
├── main.ts                            # Entry point local
├── common/
│   └── tenant/
│       ├── current-tenant.decorator.ts
│       └── tenant-host.middleware.ts
├── config/
│   └── swagger.config.ts
├── database/
│   └── prisma/
│       ├── schema.prisma
│       ├── migrations/
│       └── generated/
└── modules/
    ├── admin/                         # Gerenciamento de tenants
    │   ├── controllers/
    │   ├── services/
    │   └── admin.module.ts
    ├── tenant/                        # Dados de tenant (tema, hero, etc)
    │   ├── controllers/
    │   ├── dto/
    │   ├── repositories/
    │   ├── services/
    │   ├── use-cases/
    │   └── tenant.module.ts
    ├── products/                      # Catálogo de produtos
    │   ├── controllers/
    │   ├── dto/
    │   ├── repositories/
    │   ├── services/
    │   └── product.module.ts
    └── prisma/
        ├── prisma.module.ts
        └── service/
```

## 📊 Modelos de Dados

Entidades suportadas no Prisma schema:

- **Tenant**: Loja multi-tenant
- **Product**: Catálogo de produtos
- **Theme**: Configuração visual (cores, fontes, etc)
- **Hero**: Banner/seção hero da loja
- **Feature**: Recursos/diferenciais da loja
- **User**: Usuários da plataforma
- **ContactFields**: Campos de contato customizáveis

## 🔌 API Endpoints

Base URL local: `http://localhost:3000`  
Base URL produção: Vercel deployment

### Admin (Gerenciamento)

```
GET    /admin                      # Lista informações admin
GET    /admin/tenants              # Lista todos os tenants
POST   /admin/tenants              # Cria novo tenant
PUT    /admin/tenants/:id          # Atualiza tenant
DELETE /admin/tenants/:id          # Deleta tenant
```

### Tenant (Dados da Loja)

```
GET  /:tenantId/tenant             # Informações do tenant
GET  /:tenantId/theme              # Configuração de tema
POST /:tenantId/theme              # Atualiza tema
```

### Products (Catálogo)

```
GET  /:tenantId/products           # Lista produtos do tenant
GET  /:tenantId/products/:name     # Busca por nome
GET  /:tenantId/products/:category # Busca por categoria
POST /:tenantId/products           # Cria novo produto
```

### Swagger

- 📖 Documentação interativa: `http://localhost:3000/docs`

## 📝 Exemplos de Payload

### Criar Tenant

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

### Criar Produto

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

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm ou pnpm
- Git

### Instalação Local

```bash
# 1. Clone o repositório
git clone https://github.com/JockaMt/api-ecommerce.git
cd api-ecommerce

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
# Crie um arquivo .env na raiz:
# DATABASE_URL="file:./dev.db"
# PORT=3000

# 4. Execute migrations do Prisma
npx prisma migrate dev

# 5. Inicie o servidor de desenvolvimento
npm run start:dev
```

A API estará disponível em `http://localhost:3000`  
Swagger em `http://localhost:3000/docs`

## ⚙️ Variáveis de Ambiente

| Variável | Obrigatória | Padrão | Descrição |
|----------|-------------|--------|-----------|
| `DATABASE_URL` | ✅ | - | URL de conexão do banco (SQLite) |
| `PORT` | ❌ | 3000 | Porta do servidor |

### Exemplo .env

```
DATABASE_URL=file:./dev.db
PORT=3000
NODE_ENV=development
```

## 📦 Scripts NPM

```bash
# Desenvolvimento
npm run start:dev          # Executa com hot-reload

# Build & Produção
npm run build              # Compila TypeScript
npm run start:prod         # Executa versão compilada

# Qualidade de código
npm run lint               # Executa ESLint
npm run format             # Formata código com Prettier

# Testes
npm run test               # Executa testes unitários
npm run test:watch         # Modo watch
npm run test:cov           # Com cobertura
npm run test:e2e           # Testes end-to-end

# Prisma
npx prisma migrate dev     # Cria e executa migrations
npx prisma migrate reset   # Reset do banco
npx prisma generate        # Gera Prisma Client
npx prisma studio         # Abre UI do Prisma
```

## 🗄️ Banco de Dados

### Prisma Workflow

Com schema em `src/database/prisma/schema.prisma`:

```bash
# Criar nova migration
npx prisma migrate dev --name descricao_mudanca

# Resetar banco (dev apenas)
npx prisma migrate reset

# Gerar Prisma Client
npx prisma generate

# Visualizar dados
npx prisma studio
```

### Migrations

Histórico de alterações no schema em `src/database/prisma/migrations/`.  
Cada migration é um snapshot versionado das alterações.

## 🌐 Deployment (Vercel)

### Como funciona

- API é servida como **funções serverless** no Vercel
- Entry point: `api/index.ts`
- Arquivo `vercel.json` configura rewrites e deployment
- Bootstrap compartilhado em `src/bootstrap.ts` para local + serverless

### Deploy automático

```bash
git push origin main
```

→ Vercel detecta mudanças e faz deploy automático

### Variáveis de produção

Configure no dashboard Vercel:
- `DATABASE_URL`: String de conexão do banco (prod)
- `NODE_ENV=production`

## 🔒 Segurança Multi-tenant

### Pontos-chave

1. **Tenant por host**: Middleware extrai tenant automaticamente
2. **Sem confiança no cliente**: `tenantId` nunca vem de payload/header
3. **Contexto propagado**: Decorador `@CurrentTenant()` fornece tenant verificado
4. **Isolamento**: Queries filtram automaticamente por tenant

### Boas práticas

```typescript
// ✅ Correto: tenant do contexto
const product = await this.productService.create(
  createDto,
  this.currentTenant // vem do decorador
);

// ❌ Evitar: confiar no tenantId do cliente
const product = await this.productService.create(
  { ...createDto, tenantId: body.tenantId }
);
```

## 📚 Documentação Adicional

- [ARQUITETURA_MULTITENANT.md](./ARQUITETURA_MULTITENANT.md) - Detalhes da arquitetura multi-tenant
- [ROADMAP.md](./ROADMAP.md) - Plano de desenvolvimento futuro

## 🤝 Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feat/minha-feature`
2. Faça suas alterações e commits: `git commit -m "feat: descrição"`
3. Abra um Pull Request
4. Aguarde review

## 📄 Licença

Este projeto está sob a licença MIT.
