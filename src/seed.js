const mongoose = require('mongoose');
const Order = require('./models/Order');
require('dotenv').config();

const seedData = [
    {
        orderId: 'v10089015vdb-01',
        value: 10000,
        creationDate: '2023-07-19T12:24:11.529Z',
        items: [
            {
                productId: 2434,
                quantity: 1,
                price: 1000
            }
        ]
    },
    {
        orderId: 'v10089016vdb-02',
        value: 25000,
        creationDate: '2023-07-20T15:30:00.000Z',
        items: [
            {
                productId: 1001,
                quantity: 2,
                price: 5000
            },
            {
                productId: 1002,
                quantity: 3,
                price: 5000
            }
        ]
    },
    {
        orderId: 'v10089017vdb-03',
        value: 50000,
        creationDate: '2023-07-21T10:15:30.000Z',
        items: [
            {
                productId: 3001,
                quantity: 5,
                price: 8000
            },
            {
                productId: 3002,
                quantity: 2,
                price: 5000
            }
        ]
    },
    {
        orderId: 'v10089018vdb-04',
        value: 15000,
        creationDate: '2023-07-22T14:45:00.000Z',
        items: [
            {
                productId: 2001,
                quantity: 3,
                price: 5000
            }
        ]
    },
    {
        orderId: 'v10089019vdb-05',
        value: 30000,
        creationDate: '2023-07-23T09:20:15.000Z',
        items: [
            {
                productId: 4001,
                quantity: 1,
                price: 20000
            },
            {
                productId: 4002,
                quantity: 1,
                price: 10000
            }
        ]
    }
];

async function seed() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/orderdb');
        console.log('✅ Conectado ao MongoDB');

        // Clear existing data
        await Order.deleteMany({});
        console.log('🧹 Banco de dados limpo');

        // Insert seed data
        const result = await Order.insertMany(seedData);
        console.log(`✅ ${result.length} pedidos inseridos com sucesso!`);

        // Display inserted orders
        console.log('\n📋 Pedidos inseridos:');
        result.forEach((order, index) => {
            console.log(`\n${index + 1}. ${order.orderId}`);
            console.log(`   Valor: R$ ${order.value.toLocaleString('pt-BR')}`);
            console.log(`   Data: ${new Date(order.creationDate).toLocaleDateString('pt-BR')}`);
            console.log(`   Itens: ${order.items.length}`);
        });

        // Close connection
        await mongoose.connection.close();
        console.log('\n✅ Seed concluído e conexão fechada');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao executar seed:', error);
        process.exit(1);
    }
}

seed();
