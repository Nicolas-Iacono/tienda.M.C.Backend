const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productos/productController');

// CRUD de productos
router.get('/all', ProductController.getAllProducts);
router.get('/producto/:id', ProductController.getProductById);
router.post('/crear-producto', ProductController.createProduct);
router.put('/producto/:id', ProductController.updateProduct);
router.delete('/producto/:id', ProductController.deleteProduct);
router.get('/latestfive', ProductController.getLatestFiveProducts);
router.get('/latest', ProductController.getLatestProducts);
router.get('/search', ProductController.searchProducts);

module.exports = router;
