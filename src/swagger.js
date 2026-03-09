const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gerenciamento de Pedidos',
            version: '1.0.0',
            description: 'API RESTful para gerenciar pedidos com operações CRUD completas. Desafio técnico para posição de Jr System Analyst na Jitterbit.',
            contact: {
                name: 'Jitterbit',
                url: 'https://www.jitterbit.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento'
            }
        ]
    },
    apis: ['./src/swaggerRoutes.js']
};

module.exports = swaggerJsdoc(swaggerOptions);
