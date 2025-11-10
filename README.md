# API de Máquinas (Compass + Atlas) com Swagger

## Como documentar para aparecer no Swagger UI
Documente **as rotas** com comentários `#swagger` (tags, summary, description, parameters, requestBody, responses). Depois gere:
```bash
npm run swagger   # cria swagger_output.json
npm run dev       # sobe a API
# abra http://localhost:3000/api-docs
```

## Pastas e o que documentar
- `src/routes` → **onde a documentação aparece** (comentários `#swagger`)
- `src/models` → schemas (não aparecem direto; use em `components/schemas`)
- `src/validators` → regras Joi (explique no README)
- `src/middleware` → explique propósito (logger/erros) no README
- `src/config` → explique seleção Compass/Atlas no README

## Alternar Compass × Atlas
Edite `.env`:
```
DB_MODE=local   # ou atlas
MONGODB_URI_LOCAL=mongodb://localhost:27017/maquinas
MONGODB_URI_ATLAS=mongodb+srv://usuario:SENHA@cluster0.xxxxx.mongodb.net/maquinas
```

## Scripts
- `npm run swagger` → gera `swagger_output.json`
- `npm run dev` → desenvolvimento
- `npm start` → produção

## Endpoints úteis
- `/health` → status
- `/api/maquinas` → CRUD
- `/api-docs` → Swagger UI

## Diferença entre Middleware e Validador
Conceito	O que faz	Exemplo no seu projeto
Middleware	Intercepta todas as requisições que passam por uma rota, e pode modificar, validar, bloquear ou registrar antes de chegar ao controlador final	loggerCustom, errorHandler, notFound
Validador (Joi)	Só valida os dados do corpo (req.body) ou parâmetros, quando você o chama manualmente dentro da rota	machineCreateSchema.validate(req.body)

##Em resumo:
Middleware → o Express executa automaticamente em toda requisição.
Validador Joi → você precisa chamar manualmente dentro da rota
