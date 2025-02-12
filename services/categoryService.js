const Category = require('../models/Category');
const  Product  = require('../models/Product');
const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

exports.getAllCategory = async () => {
    try {
      const categoriesWithProducts = await Category.findAll({
        include: {
          model: Product,
          required: false, // LEFT OUTER JOIN
        },
      });
  
      // Procesa los resultados
      const formattedCategories = categoriesWithProducts.map((category) => ({
        id: category.id,
        name: category.name,
        products: category.Products.map((product) => ({
          id: product.id,
          name: product.nombre,
          priceLista: product.precioLista,
          price: product.precioVenta,
          stock: product.stock,
          descripcion: product.descripcion,
          imageUrl: product.imageUrl,
          brand: product.marca,
          imagenes: product.imagenes
          
        })),
      }));
  
      return formattedCategories;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw new Error('Error al obtener categorías'); // Lanza el error para el controlador
    }
  };

  exports.getCategoryById = async (id) => {
    try {
      // Busca la categoría por ID e incluye los productos relacionados
      const category = await Category.findByPk(id, {
        include: {
          model: Product,
          required: false, // LEFT OUTER JOIN
        },
      });
  
      // Verifica si la categoría existe
      if (!category) {
        throw new Error('Categoría no encontrada');
      }
  
      // Formatea los datos
      const formattedCategory = {
        id: category.id,
        name: category.name,
        products: category.Products.map((product) => ({
          id: product.id,
          name: product.nombre,
          priceLista: product.precioLista,
          price: product.precioVenta,
          stock: product.stock,
          descripcion: product.descripcion,
          imageUrl: product.imageUrl,
          brand: product.marca,
          imagenes: product.imagenes
        })),
      };
  
      return formattedCategory;
    } catch (error) {
      console.error('Error al obtener la categoría:', error.message);
      throw new Error('Error al obtener la categoría'); // Lanza el error para el controlador
    }
  };
exports.createCategory = async (categoryData) => {
    return await Category.create(categoryData);
};

exports.updateCategory = async (id, categoryData) => {
    const category = await Category.findByPk(id);
    if (!category) throw new Error('categoria no encontrada');

    return await product.update(categoryData);
};

exports.deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) throw new Error('Categoria no encontrada');

    await category.destroy();
    return { message: 'categoria eliminada con éxito' };
};

exports.fetchCategoriesWithProducts = async () => {
    try{
        const categories = await Category.findAll({
            include: [
                {
                    model: Product,
                    as: 'category',
                },
            ],
    });
    return categories;
}catch (error) {
    console.error('Error fetching categories with products:', error);
    throw error; // Lanza el error para manejarlo en otra parte
  }
}


// Endpoint para buscar productos por categoría