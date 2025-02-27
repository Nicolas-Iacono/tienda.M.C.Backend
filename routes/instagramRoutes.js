const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/instagram/instagramController');
const { authenticate } = require('../middlewares/authMiddleware');

// Rutas protegidas que requieren autenticación
router.get('/feed', authenticate, instagramController.getInstagramFeed);
router.post('/post', authenticate, instagramController.postToInstagram);
router.get('/stats', authenticate, instagramController.getInstagramStats);

module.exports = router;
