// routes/envioRoutes.js
const express = require('express');
const router = express.Router();
const enviosController = require('../controllers/envios/enviosController')

// POST /api/envios/calcular
router.post('/rates', enviosController.getShippingRates);

module.exports = router;