const orderService = require('../../services/orderService');

exports.createOrder = async (req, res) => {
    try {
        const { userId, products } = req.body;
        const result = await orderService.createOrder({ userId, products });
        return res.json(result);
    } catch (error) {
        console.error("Error al crear la orden:", error);
        return res.status(500).json({ error: error.message });
    }
};



exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        res.status(500).json({ message: 'Error al obtener las órdenes', error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error("Error al obtener orden:", error);
        res.status(500).json({ message: 'Error al obtener orden', error: error.message });
    }
};