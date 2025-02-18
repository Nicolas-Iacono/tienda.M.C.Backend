const correoArgentino = require('../../services/correoArgentino')
const { Product, User } = require('../../models');
const {Address} = require('../../models/userInfo/Address');
module.exports = {
    async getShippingRates(req, res) {
        try {
            const {
                postalCodeOrigin,
                postalCodeDestination,
                deliveredType,
                weight,
                height,
                width,
                length,
                productId,
                userId,
            } = req.body;

            // 1. Obtener el usuario y la dirección
            const user = await User.findByPk(userId, { include: Address });
            if (!user || !user.address) {
                return res.status(400).json({ message: 'Usuario o dirección no encontrados' });
            }

            // 2. Obtener el producto y sus dimensiones
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(400).json({ message: 'Producto no encontrado' });
            }
            const dimensions = {
                weight: product.peso * 1000 || weight * 1000, // Peso en gramos (de kg a gr)
                height: product.alto || height,      // Alto en cm
                width: product.ancho || width,       // Ancho en cm
                length: product.largo || length,      // Largo en cm
            };

            const requestBody = {
                customerId: user.micorreo_id, // Asegúrate de tener este campo en tu modelo User
                postalCodeOrigin: postalCodeOrigin || user.address.zip_code,
                postalCodeDestination,
                deliveredType,
                dimensions,
            };

            // 3. Llamar a la API de Correo Argentino
            const rates = await correoArgentino.getRates(requestBody);
            res.json(rates);
        } catch (error) {
            console.error('Error en getShippingRates:', error);
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else {
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        }
    },
    // ... (otras funciones para manejar envíos)
};