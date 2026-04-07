# API Ecommerce

API para cadastro e gerenciamento de itens de e-commerce em modelo multi-tenant.

## Requisitos funcionais

### Contexto

Esta API deve permitir o cadastro e gerenciamento de itens de e-commerce em um modelo multi-tenant, com segregacao por identificador de e-commerce.

### RF-01 - Cadastro de item

- A API deve permitir cadastrar um item informando, no minimo: `nome`, `descricao`, `preco`, `estoque` e `ecommerceId`.
- O item criado deve receber um identificador unico.

### RF-02 - Consulta de itens por e-commerce

- A API deve permitir listar itens filtrando obrigatoriamente por `ecommerceId`.
- A resposta nao deve incluir itens de outros e-commerces.

### RF-03 - Consulta de item por ID

- A API deve permitir consultar um item especifico por `itemId`, respeitando o escopo do `ecommerceId`.
- Se o item nao pertencer ao `ecommerceId` informado, a API deve responder como nao encontrado.

### RF-04 - Edicao de item

- A API deve permitir editar dados de um item existente (`nome`, `descricao`, `preco`, `estoque`) dentro do mesmo `ecommerceId`.
- A operacao de edicao deve exigir autenticacao.

### RF-05 - Remocao de item

- A API deve permitir remover um item existente dentro do mesmo `ecommerceId`.
- A operacao de remocao deve exigir autenticacao.

### RF-06 - Controle de autenticacao

- As operacoes de escrita (`cadastrar`, `editar` e `remover`) devem exigir usuario autenticado.
- Requisicoes sem autenticacao valida devem ser rejeitadas com erro de acesso nao autorizado.

### RF-07 - Isolamento de dados entre e-commerces

- Nenhuma operacao deve permitir acesso ou alteracao de itens de outro `ecommerceId`.
- O `ecommerceId` deve ser tratado como criterio obrigatorio de segregacao em todas as operacoes.

## Como executar

```bash
npm install
npm run start
```

## Testes

```bash
npm run test
npm run test:e2e
npm run test:cov
```
