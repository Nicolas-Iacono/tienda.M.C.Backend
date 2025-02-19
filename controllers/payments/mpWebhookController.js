// src/controllers/mpWebhookController.js
const mpService = require('../../services/mpService');

exports.handleNotification = async (req, res) => {
  try {
    const payload = req.body;
    console.log('Notificación recibida de Mercado Pago:', payload);

    await mpService.processNotification(payload);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error en el controlador de webhook:', error);
    res.sendStatus(500);
  }
};
