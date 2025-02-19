// src/controllers/mpWebhookController.js
const mpService = require('../../services/mpService');

exports.handleNotification = async (req, res) => {
  try {
    const payload = req.body;
    console.log('Notificación recibida de Mercado Pago:', payload);

    // Validar que el payload tenga la información necesaria
    if (!payload || (!payload.data && !payload.resource)) {
      console.error('Payload inválido recibido:', payload);
      return res.status(400).json({ error: 'Payload inválido' });
    }

    await mpService.processNotification(payload);

    return res.status(200).json({ message: 'Notificación procesada correctamente' });
  } catch (error) {
    console.error('Error en el controlador de webhook:', error);
    return res.status(500).json({ error: 'Error procesando la notificación' });
  }
};
