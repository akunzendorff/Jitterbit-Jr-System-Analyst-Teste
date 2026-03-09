const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const orderController = require('./controllers/orderController');
require('dotenv').config();

const app = express();
app.use(express.json());

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Gerenciamento de Pedidos',
        version: '1.0.0',
        description: 'API RESTful para gerenciar pedidos com operações CRUD completas'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server'
        }
    ],
    components: {
        schemas: {
            Order: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    orderId: { type: 'string' },
                    value: { type: 'number' },
                    creationDate: { type: 'string', format: 'date-time' },
                    items: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                productId: { type: 'number' },
                                quantity: { type: 'number' },
                                price: { type: 'number' }
                            }
                        }
                    }
                }
            },
            OrderInput: {
                type: 'object',
                required: ['numeroPedido', 'valorTotal', 'items'],
                properties: {
                    numeroPedido: { type: 'string' },
                    valorTotal: { type: 'number' },
                    dataCriacao: { type: 'string', format: 'date-time' },
                    items: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                idItem: { type: 'string' },
                                quantidadeItem: { type: 'number' },
                                valorItem: { type: 'number' }
                            }
                        }
                    }
                }
            }
        }
    },
    paths: {
        '/order': {
            post: {
                summary: 'Criar um novo pedido',
                tags: ['Pedidos'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/OrderInput' }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Pedido criado com sucesso',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Order' }
                            }
                        }
                    },
                    400: { description: 'Requisição inválida' }
                }
            }
        },
        '/order/list': {
            get: {
                summary: 'Listar todos os pedidos',
                tags: ['Pedidos'],
                responses: {
                    200: {
                        description: 'Lista de pedidos',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Order' }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/order/{numeroPedido}': {
            get: {
                summary: 'Obter um pedido específico',
                tags: ['Pedidos'],
                parameters: [
                    {
                        in: 'path',
                        name: 'numeroPedido',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Número do pedido'
                    }
                ],
                responses: {
                    200: {
                        description: 'Pedido encontrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Order' }
                            }
                        }
                    },
                    404: { description: 'Pedido não encontrado' }
                }
            },
            put: {
                summary: 'Atualizar um pedido',
                tags: ['Pedidos'],
                parameters: [
                    {
                        in: 'path',
                        name: 'numeroPedido',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/OrderInput' }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Pedido atualizado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Order' }
                            }
                        }
                    },
                    404: { description: 'Pedido não encontrado' }
                }
            },
            delete: {
                summary: 'Deletar um pedido',
                tags: ['Pedidos'],
                parameters: [
                    {
                        in: 'path',
                        name: 'numeroPedido',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    200: { description: 'Pedido deletado' },
                    404: { description: 'Pedido não encontrado' }
                }
            }
        }
    }
};

// Setup Swagger
const swaggerSpec = swaggerJsdoc({ definition: swaggerDefinition, apis: [] });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/orderdb')
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro de conexão:', err));

// Routes
app.post('/order', orderController.createOrder);
app.get('/order/list', orderController.listAllOrders);
app.get('/order/:id', orderController.getOrderById);
app.put('/order/:id', orderController.updateOrder);
app.delete('/order/:id', orderController.deleteOrder);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});

module.exports = app;