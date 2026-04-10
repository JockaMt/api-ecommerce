# 🏗️ Arquitetura Multi-Tenant E-commerce

## 1️⃣ Visão Geral

Sistema de e-commerce SaaS onde você vende acesso para múltiplos clientes através de uma **única API centralizada** que isola dados por `tenant_id`.

```
┌─────────────────────────────────────────────┐
│         Painel Admin (Seu Dashboard)        │
│  - Criar clientes                           │
│  - Gerar API Keys                           │
│  - Ver analytics de cada tenant             │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│      API Central NestJS (Uma única)         │
│  - Autentica por API Key + Tenant ID        │
│  - Middleware isoala dados por tenant       │
│  - CRUD compartilhado para todos            │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│    PostgreSQL (Banco Único)                 │
│  - Tabela 'tenants'                         │
│  - Tabelas de produtos, pedidos, etc        │
│  - Coluna 'tenant_id' em cada registro      │
└─────────────────────────────────────────────┘
```

## 2️⃣ Fluxo de Venda e Onboarding

### Passo 1: Admin cria novo cliente
```bash
POST /admin/tenants
{
  "name": "Loja Cliente A",
  "email": "admin@clientea.com",
  "plan": "professional"
}

Response:
{
  "id": "tenant_uuid_123",
  "name": "Loja Cliente A",
  "api_key": "sk_live_abc123xyz789",
  "tenant_id": "tenant_123",
  "created_at": "2026-04-07T10:00:00Z"
}
```

### Passo 2: Cliente usa API com credenciais
```bash
GET /products
Headers:
  X-Tenant-Id: tenant_123
  Authorization: Bearer sk_live_abc123xyz789

Response:
  - Retorna APENAS produtos desse tenant
  - Com isolamento automático
```

### Passo 3: Dados isolados no banco
```sql
-- Tabela tenants
id | name           | api_key              | status | created_at
1  | Loja Cliente A | sk_live_abc123xyz789 | active | 2026-04-07

-- Tabela products (exemplo)
id | tenant_id | name          | price | created_at
1  | 1         | Produto A     | 99.90 | 2026-04-07
2  | 2         | Outro Produto | 49.90 | 2026-04-07

-- Quando Cliente A faz GET /products:
-- Query: SELECT * FROM products WHERE tenant_id = 1
-- Resultado: Só vê Produto A
```

## 3️⃣ Estrutura do Projeto

```
src/
├── common/
│   ├── decorators/
│   │   └── tenant.decorator.ts         # Extrai tenant_id dos headers
│   ├── guards/
│   │   └── tenant-auth.guard.ts        # Valida API Key + Tenant
│   ├── interceptors/
│   │   └── tenant-isolation.interceptor.ts  # Injeta tenant_id nas queries
│   └── middleware/
│       └── tenant.middleware.ts        # Valida tenant no contexto
│
├── modules/
│   ├── tenants/
│   │   ├── tenants.service.ts
│   │   ├── tenants.controller.ts
│   │   ├── tenant.repository.ts
│   │   └── dto/
│   │
│   ├── products/
│   │   ├── products.service.ts
│   │   ├── products.controller.ts
│   │   └── product.repository.ts
│   │
│   ├── orders/
│   │   ├── orders.service.ts
│   │   └── orders.controller.ts
│   │
│   └── admin/
│       ├── admin.service.ts
│       └── admin.controller.ts
│
├── database/
│   ├── sql/
│   │   ├── schema.sql
│   │   └── migrations/
│   └── seeds/
│
└── main.ts
```

## 4️⃣ Banco de Dados (SQL)

### Estrutura Base (exemplo)
```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  api_key VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  plan VARCHAR(40) NOT NULL DEFAULT 'starter',
  status VARCHAR(40) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name VARCHAR(140) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_tenant_id ON products (tenant_id);
```

## 5️⃣ Mecanismo de Isolamento por Tenant

### Decorator para Extrair Tenant
```typescript
// src/common/decorators/tenant.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Tenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenantId;  // Injetado pelo guard
  },
);
```

### Guard de Autenticação
```typescript
// src/common/guards/tenant-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TenantsService } from '../../modules/tenants/tenants.service';

@Injectable()
export class TenantAuthGuard implements CanActivate {
  constructor(private tenantsService: TenantsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const apiKey = request.headers['authorization']?.split('Bearer ')[1];
    const tenantId = request.headers['x-tenant-id'];

    if (!apiKey || !tenantId) {
      throw new UnauthorizedException('Missing credentials');
    }

    const tenant = await this.tenantsService.validateApiKey(apiKey, tenantId);
    if (!tenant) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Injetar no request para acessar depois
    request.tenantId = tenant.id;
    request.tenant = tenant;

    return true;
  }
}
```

### Uso em Controllers
```typescript
// src/modules/products/products.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../common/guards/tenant-auth.guard';
import { Tenant } from '../../common/decorators/tenant.decorator';

@Controller('products')
@UseGuards(TenantAuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll(@Tenant() tenantId: string) {
    // Service automaticamente filtra por tenantId
    return this.productsService.findAll(tenantId);
  }
}
```

### Service com Isolamento
```typescript
// src/modules/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../modules/products/product.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  async findAll(tenantId: string) {
    // SEMPRE filtra por tenantId
    return this.productRepository.findAllByTenant(tenantId);
  }

  async findById(tenantId: string, productId: string) {
    return this.productRepository.findByIdForTenant(tenantId, productId);
    // ⚠️ IMPORTANTE: Você DEVE verificar se tenantId bate!
  }

  async create(tenantId: string, data: CreateProductDto) {
    return this.productRepository.createForTenant(tenantId, data);
  }
}
```

## 6️⃣ Safety: Prevenindo Vazamento de Dados

### ❌ PERIGOSO (Fácil de vazar dados):
```typescript
// NÃO FAÇA ISSO!
async findById(id: string) {
  return this.productRepository.findById(id);
  // Cliente A consegue acessar produtos do Cliente B!
}
```

### ✅ SEGURO:
```typescript
// FAÇA ASSIM
async findById(tenantId: string, id: string) {
  const product = this.productRepository.findById(id);
  
  if (product.tenantId !== tenantId) {
    throw new UnauthorizedException('Product not found');
  }
  
  return product;
}
```

## 7️⃣ Integração de Novo Cliente

1. **Admin cria tenant** via `/admin/tenants` (POST)
2. **Sistema gera**:
   - UUID único para tenant
   - API Key criptografada
3. **Cliente recebe credenciais** (email/download)
4. **Cliente usa a API**:
   ```bash
   curl -H "X-Tenant-Id: tenant_123" \
        -H "Authorization: Bearer sk_live_abc..." \
        https://api.seu-ecommerce.com/products
   ```
5. **Dados isolados automaticamente** pelo middleware

## 8️⃣ Escalabilidade Futura

- **Redis Cache**: Cache de produtos por tenant
- **API Gateway**: Rate limiting por tenant
- **Filas assíncronas**: Bull para processar pedidos
- **Logs centralizados**: Logar todas as ações com tenant_id
- **Migrations isoladas**: Migrations por tenant (upgrade de plano)

---

Pronto! Este é o fluxo completo. Quer que eu comece a **implementar a estrutura do projeto**?
