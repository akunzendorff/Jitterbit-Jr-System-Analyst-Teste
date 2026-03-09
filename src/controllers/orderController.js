const Order = require('../models/Order');

// Função auxiliar para mapear dados de entrada para formato de banco
const mapOrderData = (data) => {
    return {
        orderId: data.numeroPedido,
        value: data.valorTotal,
        creationDate: data.dataCriacao ? new Date(data.dataCriacao) : new Date(),
        items: (data.items || []).map(item => ({
            productId: parseInt(item.idItem),
            quantity: item.quantidadeItem,
            price: item.valorItem
        }))
    };
};

exports.createOrder = async (req, res) => {
    try {
        const { numeroPedido, valorTotal, dataCriacao, items } = req.body;
        
        // Validação básica
        if (!numeroPedido || !valorTotal || !items || items.length === 0) {
            return res.status(400).json({ 
                error: 'Campos obrigatórios faltando: numeroPedido, valorTotal, items' 
            });
        }
        
        const mappedOrder = mapOrderData(req.body);
        const newOrder = new Order(mappedOrder);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar o pedido', details: error.message });
    }   
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o pedido', details: error.message });
    }
};

// Endpoint opcional: Listar todos os pedidos
exports.listAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar pedidos', details: error.message });
    }
};

// Endpoint opcional: Atualizar um pedido
exports.updateOrder = async (req, res) => {
    try {
        const { numeroPedido, valorTotal, dataCriacao, items } = req.body;
        
        const order = await Order.findOne({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        
        // Atualiza apenas os campos fornecidos
        const mappedData = {};
        if (numeroPedido) mappedData.orderId = numeroPedido;
        if (valorTotal) mappedData.value = valorTotal;
        if (dataCriacao) mappedData.creationDate = new Date(dataCriacao);
        if (items) {
            mappedData.items = items.map(item => ({
                productId: parseInt(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }));
        }
        
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: req.params.id },
            mappedData,
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar o pedido', details: error.message });
    }
};

// Endpoint opcional: Deletar um pedido
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        res.status(200).json({ message: 'Pedido deletado com sucesso', deletedOrder: order });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o pedido', details: error.message });
    }
};