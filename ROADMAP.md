# 🚀 Roadmap de Implementação - E-commerce Multi-tenant

## Fase 1: Fundação (COMECE AQUI ⭐)
Configurar a base do projeto para multi-tenant

- [ ] **1.1** Definir camada de persistência + tipos
- [ ] **1.2** Configurar PostgreSQL local (ou SQLite para teste)
- [ ] **1.3** Criar modelo de tenants na estratégia de persistência escolhida
- [ ] **1.4** Rodar primeira migration

## Fase 2: Autenticação
Implementar isolamento por tenant

- [ ] **2.1** Criar decorator `@Tenant()` 
- [ ] **2.2** Criar guard `TenantAuthGuard`
- [ ] **2.3** Implementar validação de API Key

## Fase 3: Módulos Principais
Criar os CRUD de negócio

- [ ] **3.1** Módulo `Tenants` (criar/listar clientes)
- [ ] **3.2** Módulo `Products` (exemplo com isolamento)
- [ ] **3.3** Módulo `Orders` (pedidos isolados)

## Fase 4: Admin
Painel para gerenciar clientes

- [ ] **4.1** Criar controller protected `/admin/tenants`
- [ ] **4.2** Gerar API Keys automaticamente
- [ ] **4.3** Visualizar relatórios por tenant

## Fase 5: Testes & Deploy
Garantir segurança

- [ ] **5.1** Testes de isolamento
- [ ] **5.2** Validação de segurança
- [ ] **5.3** Deploy e documentação

---

## ⚡ Comece pelo Passo 1.1:

```bash
npm install bcrypt jsonwebtoken passport passport-jwt class-validator class-transformer
npm install -D @types/node @types/bcrypt @types/jsonwebtoken
```
