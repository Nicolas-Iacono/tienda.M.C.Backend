// src/services/mpService.js
const {Payment} = require('../models');

exports.processNotification = async (payload) => {
  try {
    if (payload.topic === 'payment') {
      if (!payload.data || !payload.data.id) {
        console.error("El payload de notificación no contiene datos de pago válidos:", payload);
        return;
      }
      
      const paymentInfo = payload.data;
      
      // Mapea los datos recibidos a la estructura de tu tabla
      const paymentData = {
        payment_id: paymentInfo.id.toString(), // Convertir a string si es numérico
        status: paymentInfo.status,
        amount: paymentInfo.transaction_amount,
        payer_email: paymentInfo.payer && paymentInfo.payer.email ? paymentInfo.payer.email : null,
      };

      // Inserta o actualiza el registro basado en la clave primaria (payment_id)
      await Payment.upsert(paymentData);
      console.log(`Pago ${paymentData.payment_id} guardado/actualizado en la base de datos.`);
    } else {
      console.log(`Notificación de tipo ${payload.topic} no se procesa en este servicio.`);
    }
  } catch (error) {
    console.error('Error al procesar la notificación:', error);
    throw error;
  }
};
