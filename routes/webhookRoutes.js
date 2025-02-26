const express = require('express');
const router = express.Router();
const mpWebhookController = require('../controllers/payments/mpWebhookController');

// Ruta para el webhook de Mercado Pago
router.post('/mercadopago', mpWebhookController.handleNotification);

module.exports = router;
