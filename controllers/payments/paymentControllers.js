const { preferenceClient, RETURN_URLS } = require("../../config/mpClient");
const Order = require('../../models/Order');
const OrderDetail = require('../../models/OrderDetail');
const sequelize = require('../../config/database');

exports.createPreference = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { items, payer } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: "Se requiere un array de items con al menos un elemento" 
      });
    }

    // Generar un código único para external_reference
    const externalReference = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Validar y formatear los items con más detalles
    const formattedItems = items.map(item => ({
      id: item.id,
      title: item.title,
      unit_price: Number(item.unit_price),
      quantity: Number(item.quantity),
      currency_id: "ARS",
      picture_url: item.image,
      description: item.description || item.title,
      category_id: "others"
    }));

    const payerData = {
      id: payer.id,
      name: payer.name,
      surname: payer.surname,
      email: payer.email,
      phone: {
        area_code: payer.phone.area_code,
        number: payer.phone.number,
      },
      address: {
        zip_code: payer.address.zip_code,
        street_name: payer.address.street_name,
        street_number: payer.address.street_number,
      },
    }

    const preferenceData = {
      external_reference: externalReference,
      items: formattedItems,
      payer: payerData,
      back_urls: RETURN_URLS,
      auto_return: "approved",
      statement_descriptor: "MegaOfertas",
      payment_methods: {
        excluded_payment_types: [
          { id: "ticket" }
        ],
        installments: 12,
        default_installments: 1
      },
      binary_mode: true,
      expires: true,
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        platform: "mobile",
        source: "web"
      },
      presentation: {
        currency_id: "ARS",
        operation_type: "regular_payment"
      },
      notification_url: "https://backend-megaofertas-production.up.railway.app/webhook/mercadopago",
      ui: {
        layout: "mobile",
        show_shipping: false,
        show_installments: true,
        show_promotions: true
      }
    };

    // Calcular el monto total
    const totalAmount = formattedItems.reduce((total, item) => total + (item.unit_price * item.quantity), 0);
    
    // Crear la orden en la base de datos
    const order = await Order.create({
      preferenceId: externalReference,
      paymentStatus: 'pending',
      totalAmount: totalAmount,
      purchaseDate: new Date(),
      shippingAddress: `${payerData.address.street_name} ${payerData.address.street_number}`,
      shippingZipCode: payerData.address.zip_code,
      userId: payer.id || null
    }, { transaction: t });

    // Crear los detalles de la orden
    const orderDetails = formattedItems.map(item => ({
      orderId: order.id,
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      subtotal: item.unit_price * item.quantity
    }));

    await OrderDetail.bulkCreate(orderDetails, { transaction: t });

    // Crear la preferencia en Mercado Pago
    const preference = await preferenceClient.create({ body: preferenceData });
    
    // Confirmar la transacción
    await t.commit();

    return res.json({
      preferenceId: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point
    });

  } catch (error) {
    // Revertir la transacción en caso de error
    await t.rollback();
    console.error("Error al crear preferencia:", error);
    return res.status(500).json({ 
      error: "Error al crear la preferencia de pago",
      details: error.message 
    });
  }
};
