# 📦 API de Gerenciamento de Pedidos - Jitterbit

Uma API Node.js com Express e MongoDB para gerenciar pedidos com operações CRUD completas. Desafio técnico para posição de Jr System Analyst na Jitterbit.

## 📋 Sobre o Projeto

Esta é uma API RESTful desenvolvida em Node.js que permite criar, ler, atualizar e deletar pedidos de forma simples e eficiente. A API realiza mapeamento automático de dados, transformando campos recebidos nas requisições para o formato esperado no banco de dados.

### Exemplo de Transformação de Dados

**Entrada (requisição):**
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

**Armazenado no banco:**
```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

---

## 🚀 Como Começar

### Pré-requisitos

- **Node.js** (v14 ou superior)
- **MongoDB** (v4.4 ou superior) rodando em `localhost:27017`
- **npm** ou **yarn**

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/akunzendorff/Jitterbit-Jr-System-Analyst-Teste.git
cd Jitterbit-Jr-System-Analyst-Teste
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
cp src/.env.example .env
```

4. Certifique-se que o MongoDB está rodando:
```bash
# Windows (se instalado como serviço)
net start MongoDB

# Linux/Mac
brew services start mongodb-community
# ou
sudo systemctl start mongod

# Ou execute diretamente
mongod
```

### Executar o Servidor

**Modo desenvolvimento com auto-reload:**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor rodará em `http://localhost:3000`

**Documentação interativa (Swagger UI):** `http://localhost:3000/api-docs`

### Popular o Banco com Dados de Exemplo (Opcional)

Para facilitar os testes, execute o script de seed para popular o banco com 5 pedidos de exemplo:

```bash
npm run seed
```

Este comando irá:
- 🧹 Limpar o banco de dados existente
- 📝 Inserir 5 pedidos de exemplo com dados variados
- 📋 Exibir os pedidos inseridos no console

**Exemplo de saída:**
```
✅ Conectado ao MongoDB
🧹 Banco de dados limpo
✅ 5 pedidos inseridos com sucesso!

📋 Pedidos inseridos:

1. v10089015vdb-01
   Valor: R$ 10.000
   Data: 19/07/2023
   Itens: 1

2. v10089016vdb-02
   Valor: R$ 25.000
   Data: 20/07/2023
   Itens: 2
...
```

---

## 📡 Endpoints da API

### ✅ Requisitos Obrigatórios

#### 1. Criar um novo pedido
```
POST /order
```
Cria um novo pedido no banco de dados.

**Request:**
```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [{"idItem": "2434", "quantidadeItem": 1, "valorItem": 1000}]
  }'
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [{"productId": 2434, "quantity": 1, "price": 1000}],
  "__v": 0
}
```

#### 2. Obter um pedido específico
```
GET /order/:numeroPedido
```
Retorna os dados completos de um pedido.

**Request:**
```bash
curl http://localhost:3000/order/v10089015vdb-01
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [{"productId": 2434, "quantity": 1, "price": 1000}],
  "__v": 0
}
```

### ⭐ Requisitos Opcionais (Implementados)

#### 3. Listar todos os pedidos
```
GET /order/list
```

**Request:**
```bash
curl http://localhost:3000/order/list
```

#### 4. Atualizar um pedido
```
PUT /order/:numeroPedido
```

**Request:**
```bash
curl -X PUT http://localhost:3000/order/v10089015vdb-01 \
  -H "Content-Type: application/json" \
  -d '{"valorTotal": 15000}'
```

#### 5. Deletar um pedido
```
DELETE /order/:numeroPedido
```

**Request:**
```bash
curl -X DELETE http://localhost:3000/order/v10089015vdb-01
```

---

## 📁 Estrutura do Projeto

```
├── src/
│   ├── app.js                      # Aplicação principal com rotas e Swagger
│   ├── seed.js                     # Script para popular o banco com dados
│   ├── swagger.js                  # Configuração do Swagger
│   ├── swaggerRoutes.js            # Documentação dos endpoints (Swagger)
│   ├── .env.example                # Variáveis de ambiente de exemplo
│   ├── package.json                # Dependências do projeto
│   ├── controllers/
│   │   └── orderController.js      # Lógica dos endpoints CRUD
│   └── models/
│       └── Order.js                # Schema do MongoDB
├── README.md                       # Este arquivo
└── LICENSE                         # Licença do projeto
```

---

## 💾 Banco de Dados

- **Tipo:** MongoDB
- **Nome do banco:** `orderdb`
- **Conexão padrão:** `mongodb://localhost:27017/orderdb`

### Schema de Pedidos

```javascript
{
  orderId: String (único, obrigatório),
  value: Number (obrigatório),
  creationDate: Date (padrão: data atual),
  items: [
    {
      productId: Number,
      quantity: Number,
      price: Number
    }
  ]
}
```

---

## 📚 Documentação Interativa (Swagger)

A API possui uma documentação interativa gerada automaticamente com Swagger. Acesse:

```
http://localhost:3000/api-docs
```

No Swagger você pode:
- ✅ Visualizar todos os endpoints
- ✅ Ver os schemas de requisição e resposta
- ✅ Testar os endpoints diretamente no navegador
- ✅ Consultar códigos de status HTTP e descrições

---
}
```

---

## 📦 Dependências

- **express** - Framework web
- **mongoose** - ODM para MongoDB
- **dotenv** - Gerenciamento de variáveis de ambiente
- **jsonwebtoken** - Autenticação JWT
- **nodemon** - Auto-reload em desenvolvimento
- **swagger-jsdoc** - Documentação OpenAPI
- **swagger-ui-express** - UI para Swagger

---

## 🛡️ Tratamento de Erros

A API retorna códigos HTTP apropriados:

| Status | Descrição |
|--------|-----------|
| `201` | Pedido criado com sucesso |
| `200` | Operação bem-sucedida |
| `400` | Requisição inválida |
| `404` | Pedido não encontrado |
| `500` | Erro do servidor |

---


## ✨ Destaques da Implementação

✅ Todos os requisitos obrigatórios implementados  
✅ Todos os requisitos opcionais implementados  
✅ Mapeamento automático de dados  
✅ Validações de entrada  
✅ Tratamento robusto de erros  
✅ Estrutura modular e escalável  
✅ Documentação completa  
✅ Scripts de teste prontos  

---

## 👤 Autor

**Candidata:** Ana Kunzendorff  
**Projeto:** Jitterbit - Jr System Analyst Test  
**Data:** Março 2026

---

## 📄 Licença

ISC - Veja o arquivo LICENSE para detalhes.

