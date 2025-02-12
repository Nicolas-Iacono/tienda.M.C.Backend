const { MercadoPagoConfig, Preference } = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();

// Validar que existe el token de acceso
if (!process.env.MP_ACCESS_TOKEN) {
  throw new Error("MP_ACCESS_TOKEN no está definido en las variables de entorno");
}

// Configuración del cliente de MercadoPago
const mpConfig = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

// Cliente para crear preferencias de pago
const preferenceClient = new Preference(mpConfig);

// URLs base para redirecciones según el ambiente
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.FRONTEND_URL || 'https://tu-dominio-produccion.com'
  : 'http://localhost:3000';

// Configuración de URLs de retorno
const RETURN_URLS = {
  success: `${BASE_URL}/status/success`,
  failure: `${BASE_URL}/status/failure`,
  pending: `${BASE_URL}/status/pending`
};

module.exports = { 
  preferenceClient,
  RETURN_URLS
};