const { preferenceClient, RETURN_URLS } = require("../../config/mpClient");

exports.createPreference = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: "Se requiere un array de items con al menos un elemento" 
      });
    }

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

    const preferenceData = {
      items: formattedItems,
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
      // Configuración de la experiencia móvil
      binary_mode: true, // Para tener respuestas de pago inmediatas
      expires: true,
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
      // Metadata personalizada
      metadata: {
        platform: "mobile",
        source: "web"
      },
      // Configuración de la vista
      presentation: {
        currency_id: "ARS",
        operation_type: "regular_payment"
      },
      // Configuración del checkout
      payment_methods: {
        excluded_payment_types: [
          { id: "ticket" }
        ],
        installments: 12,
        default_installments: 1,
        default_payment_method_id: null,
      },
      // Configuración de la UI
      ui: {
        layout: "mobile", // Forzar layout móvil
        show_shipping: false, // No mostrar envío si no es necesario
        show_installments: true, // Mostrar cuotas disponibles
        show_promotions: true, // Mostrar promociones disponibles
      }
    };

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
