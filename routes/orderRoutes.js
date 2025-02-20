const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/ordenes/orderController');

// Rutas de órdenes
router.get('/all', OrderController.getAllOrders);
router.post('/crearorden', OrderController.createOrder);
router.get('/:id', OrderController.getOrderById);


module.exports = router;
