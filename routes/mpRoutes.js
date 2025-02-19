const express = require('express');
const router = express.Router();

// Importa el controlador de Mercado Pago
const mpWebhookController = require('../controllers/payments/mpWebhookController');

// Ruta para notificaciones de Mercado Pago
router.post('/mercadopago', mpWebhookController.handleNotification);

module.exports = router;