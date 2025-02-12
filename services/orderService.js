// orderService.js
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const { preferenceClient } = require('../config/mpClient');

exports.createOrder = async ({ userId, products }) => {
   // Calcula el monto total usando el precio de descuento ('price')
  const totalAmount = products.reduce(
    (acc, item) => acc + (item.quantity || 1) * Number(item.price),
    0
  );

  // Prepara la data para crear la preferencia en Mercado Pago
  const preferenceData = {
    items: products.map(item => {
        const price = Number(item.price);
        if (!price || isNaN(price)) {
          throw new Error(`El precio del producto ${item.name} no es válido`);
        }
        return {
          title: item.name,        // Usamos "name" como título
          unit_price: price,       // Convertido a número
          quantity: item.quantity || 1
        };
      }),
      back_urls: {
        success: "http://localhost:3000/status/success",
        failure: "http://localhost:3000/status/failure",
        pending: "http://localhost:3000/status/pending"
      },
      auto_return: "approved"
  };

  // Llama a Mercado Pago para crear la preferencia
  console.log("Preference Data:", JSON.stringify(preferenceData, null, 2));
  const mpResponse = await preferenceClient.create({ body: preferenceData });
  // Nota: mpResponse.id debe contener el identificador de la preferencia

  // Ahora, crea la orden en la base de datos con el preferenceId obtenido
  const order = await Order.create({
    userId,
    totalAmount,
    paymentStatus: "pending",
    purchaseDate: new Date(),
    preferenceId: mpResponse.id // Se asigna aquí el preferenceId
  });

  // Para cada producto, crea el detalle de la orden
  await Promise.all(
    products.map(item =>
      OrderDetail.create({
        orderId: order.id,
        productId: item.id, // Se usa el campo "id" del producto
        quantity: item.quantity || 1,
        unitPrice: item.price,
        subtotal: (item.quantity || 1) * item.price
      })
    )
  );

  // Retorna la información necesaria: orderId, preferenceId y la URL de redirección
  return {
    orderId: order.id,
    preferenceId: mpResponse.id,
    redirect_url: mpResponse.sandbox_init_point // Usa init_point en producción
  };
};
