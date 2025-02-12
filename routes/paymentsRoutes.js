const express = require('express');
const PaymentsController = require('../controllers/payments/paymentControllers');

const router = express.Router();

router.post('/create_preference', PaymentsController.createPreference);

module.exports = router;