// src/services/mpService.js
const { MercadoPagoConfig, Payment: MPPayment } = require('mercadopago');
const { Order } = require('../models/Order');
const { Payment } = require('../models/Payment');
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

exports.processNotification = async (payload) => {
  try {
    console.log('Procesando notificación:', payload);

    // Manejar notificación de pago
    if (payload.topic === 'payment' || payload.type === 'payment') {
      const paymentId = payload.data?.id || payload.resource;
      if (!paymentId) {
        throw new Error('No se encontró el ID del pago en la notificación');
      }

      console.log('Obteniendo detalles del pago:', paymentId);
      const paymentInfo = await fetchPaymentDetails(paymentId);
      
      if (!paymentInfo) {
        throw new Error(`No se pudo obtener la información del pago ${paymentId}`);
      }

      // Extraer información del pago
      const {
        status,
        status_detail,
        transaction_amount,
        external_reference,
        date_approved,
        payer,
        additional_info
      } = paymentInfo;

      // Buscar la orden por external_reference
      const order = await Order.findOne({
        where: { preferenceId: external_reference }
      });

      if (!order) {
        console.error(`No se encontró la orden con preferenceId ${external_reference}`);
        return;
      }

      // Actualizar la orden
      await order.update({
        paymentStatus: status,
        statusDetail: status_detail || null,
        paymentId: paymentId.toString(),
        paymentApprovedDate: date_approved ? new Date(date_approved) : null,
        totalAmount: transaction_amount,
        buyerInfo: {
          email: payer.email,
          name: `${payer.first_name} ${payer.last_name}`,
          phone: payer.phone?.number || null,
          identification: payer.identification
        }
      });

      console.log(`Orden ${external_reference} actualizada con éxito`);

      // Registrar el pago
      await Payment.create({
        paymentId: paymentId.toString(),
        orderId: order.id,
        status,
        statusDetail: status_detail || null,
        amount: transaction_amount,
        payerEmail: payer.email,
        payerName: `${payer.first_name} ${payer.last_name}`,
        paymentMethod: paymentInfo.payment_method_id,
        dateCreated: new Date(),
        dateApproved: date_approved ? new Date(date_approved) : null
      });

      console.log(`Pago ${paymentId} registrado con éxito`);
    }

    return true;
  } catch (error) {
    console.error('Error al procesar la notificación:', error);
    throw error;
  }
};
