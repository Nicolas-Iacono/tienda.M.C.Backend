// src/services/mpService.js
const { Payment, Order } = require('../models');
const { MercadoPagoConfig, Payment: MPPayment } = require('mercadopago');
const axios = require('axios');

// Configurar el cliente de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || 'APP_USR-4751229832754166-021415-71671c1b35c3ad4020c2f6dc03527663-570292746'
});

const payment = new MPPayment(client);

// Función para obtener detalles del pago mediante el SDK
const fetchPaymentDetails = async (paymentId) => {
  try {
    const response = await payment.get({ id: paymentId });
    return response;
  } catch (error) {
    console.error('Error al obtener los detalles del pago:', error);
    return null;
  }
};

// Función para obtener detalles del merchant order usando axios
const fetchMerchantOrderDetails = async (merchantOrderUrl) => {
  try {
    const response = await axios.get(merchantOrderUrl, {
      headers: {
        'Authorization': `Bearer ${client.accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los detalles del merchant order:', error);
    return null;
  }
};

exports.processNotification = async (payload) => {
  try {
    // Determinar el tipo de notificación
    const isMerchantOrder = payload.topic === 'merchant_order' || payload.type === 'merchant_order';
    const isPayment =
      payload.topic === 'payment' ||
      payload.type === 'payment' ||
      payload.action === 'payment.created';

    if (isMerchantOrder) {
      console.log('Procesando notificación de merchant_order para obtener detalles de la compra y del payer.');
      const merchantOrder = await fetchMerchantOrderDetails(payload.resource);
      if (!merchantOrder) {
        console.error('No se pudo obtener la información del merchant order.');
        return;
      }

      const orderData = {
        order_id: merchantOrder.id.toString(),
        items: merchantOrder.order_items || merchantOrder.items,
        payer_email:
          merchantOrder.buyer && merchantOrder.buyer.email ? merchantOrder.buyer.email : null,
        payer_name:
          merchantOrder.buyer && merchantOrder.buyer.first_name && merchantOrder.buyer.last_name
            ? `${merchantOrder.buyer.first_name} ${merchantOrder.buyer.last_name}`
            : null,
      };

      await Order.upsert(orderData);
      console.log(`Orden ${orderData.order_id} guardada/actualizada en la base de datos.`);
      return;
    } else if (isPayment) {
      let paymentInfo = payload.data;
      if (!paymentInfo || !paymentInfo.id) {
        const paymentId = payload.resource;
        if (!paymentId) {
          console.error("El payload de notificación no contiene datos de pago válidos:", payload);
          return;
        }
        console.log(`Obteniendo detalles del pago para ID: ${paymentId}`);
        paymentInfo = await fetchPaymentDetails(paymentId);
        if (!paymentInfo) {
          console.error("No se pudo obtener la información del pago para el ID:", paymentId);
          return;
        }
      }
      
      const paymentData = {
        payment_id: paymentInfo.id.toString(),
        status: paymentInfo.status,
        amount: paymentInfo.transaction_amount,
        payer_email:
          paymentInfo.payer && paymentInfo.payer.email ? paymentInfo.payer.email : null,
        payer_name:
          paymentInfo.payer && paymentInfo.payer.first_name && paymentInfo.payer.last_name
            ? `${paymentInfo.payer.first_name} ${paymentInfo.payer.last_name}`
            : null,
      };

      await Payment.upsert(paymentData);
      console.log(`Pago ${paymentData.payment_id} guardado/actualizado en la base de datos.`);
    } else {
      console.log(
        `Notificación de tipo ${payload.topic || payload.type || payload.action} no se procesa en este servicio.`
      );
    }
  } catch (error) {
    console.error('Error al procesar la notificación:', error);
    throw error;
  }
};
