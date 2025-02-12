const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categorias/categoryControllers');
const sequelize = require('../config/database');
// CRUD de category
router.get('/all', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getCategoryById);
router.post('/crear-category', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);
router.get('/allProducts',CategoryController.getCategoriesWithProducts);

module.exports = router;