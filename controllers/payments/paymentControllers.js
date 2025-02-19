const { preferenceClient, RETURN_URLS } = require("../../config/mpClient");
const Order = require('../models/Order'); // Importar el modelo de Orden

exports.createPreference = async (req, res) => {
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
      picture_url: item.image, // URL de la imagen del producto
      description: item.description || item.title, // Descripción del producto
      category_id: "others" // Categoría del producto
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

    // Crear la orden en la base de datos
    const totalAmount = formattedItems.reduce((total, item) => total + (item.unit_price * item.quantity), 0);
    
    await Order.create({
      preferenceId: externalReference,
      paymentStatus: 'pending',
      totalAmount: totalAmount,
      purchaseDate: new Date(),
      shippingAddress: `${payerData.address.street_name} ${payerData.address.street_number}`,
      shippingZipCode: payerData.address.zip_code
    });

    // Crear la preferencia en Mercado Pago
    const preference = await preferenceClient.create({ body: preferenceData });
    
    return res.json({
      preferenceId: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point
    });

  } catch (error) {
    console.error("Error al crear preferencia:", error);
    return res.status(500).json({ 
      error: "Error al crear la preferencia de pago",
      details: error.message 
    });
  }
};
