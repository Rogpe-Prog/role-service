# role-service - microservice criado para controle de roles

Microservice scaffold gerado pelo `scaffolding-cli`.

Arquitetura recomendada (Clean + Fastify)

Estrutura principal (exemplo):

```
src/
├── controllers/          # Recebe requisições, valida e chama Use Cases
│   └── <nome>.controller.ts
├── use-cases/            # Regras de negócio (Clean Architecture)
│   └── <nome>.usecase.ts
├── repositories/         # Persistência de dados / abstrações DB
│   └── <nome>.repository.ts
├── workers/              # Processamento de filas/eventos (SNS/SQS)
│   └── <nome>.worker.ts
├── health/               # Endpoints de healthcheck
│   └── health.route.ts
├── routes/               # Definição de rotas REST
│   └── <nome>.routes.ts
├── main.ts               # Inicialização do Fastify
└── server.ts             # Configuração do servidor, plugins, middlewares
```

Dependências essenciais já incluídas (Fastify, zod, dotenv, aws-sdk, jwt, etc.).

Scripts

```json
"dev": "ts-node-dev --respawn --transpile-only src/main.ts",
"build": "tsc",
"start": "node dist/main.js",
"test": "jest",
"lint": "eslint . --ext .ts"
```

Configuração TypeScript

- `strict: true`
- `outDir: dist`
- `baseUrl` e `paths` prontos para aliases (`@controllers`, `@use-cases`, ...)

Boilerplate incluso

- `src/controllers/sample.controller.ts`
- `src/use-cases/sample.usecase.ts`
- `src/repositories/sample.repository.ts`
- `src/routes/sample.routes.ts`
- `src/workers/sample.worker.ts`
- `src/health/health.route.ts`

Env & exemplos

- `.env.example` incluído com variáveis básicas

Observações de boas práticas

- Use `zod` para validação de payloads e `@opentelemetry/api` para integração futura.
- Separe responsabilidades: controllers -> use-cases -> repositories.
- Repositórios e use-cases devem ser tenant-aware (usar `X-Tenant-Id`).

Cabeçalho de correlação e execução de workers

- Este template já garante que `X-Tenant-Id` seja lido pelos controllers e passado aos use-cases.
- O middleware de entrada também garante/gera `x-correlation-id` e anexa um `requestLogger` ao request para logs estruturados.

Como executar o worker SQS (desenvolvimento)

1. Preencha `.env` com `SQS_QUEUE_URL` e `AWS_REGION`.
2. Rode o worker em dev:

```bash
npm run worker
```

O worker fará polling na fila definida por `SQS_QUEUE_URL` e tentará processar mensagens (o `SampleWorker` contém um `TODO` para o processamento do payload).

Propagação de correlação entre serviços

- Quando o BFF ou outros clientes HTTP chamarem este serviço, envie o header `x-correlation-id` para manter rastreabilidade. O template do BFF já injeta `x-correlation-id` automaticamente em requisições upstream.
- Para logs consistentes, use `(req as any).requestLogger` dentro de controllers/use-cases quando disponível.


