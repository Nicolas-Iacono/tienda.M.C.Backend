const Product = require('../models/Product');
const Category = require('../models/Category');
const { Op } = require("sequelize");
exports.getAllProducts = async () => {
    const products = await Product.findAll({
        include: {
            model: Category, // Modelo relacionado
            attributes: ['id','name'], // Campos que deseas obtener del modelo Category
            as: 'categoria'
        },
    });
    // Mapeo de productos para devolver los resultados con nombre de categoría
    const result = products.map(product => {
        return {
            id: product.id,
            name: product.nombre,
            priceLista: product.precioLista,
            price: product.precioVenta,
            stock: product.stock,
            descripcion: product.descripcion,
            imageUrl: product.imageUrl,
            brand: product.marca,
            categoriaName: product.categoria?.name  || null,
            categoriaId: product.categoriaId,
            imagenes: product.imagenes,
            fechaCreacion: product.createdAt,
            disponible:product.disponible
        };
    });

    return result;
};

exports.getProductById = async (id) => {
    return await Product.findByPk(id);
};

exports.createProduct = async (productData) => {
    
    
    return await Product.create(productData);
};

exports.updateProduct = async (id, productData) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Producto no encontrado');

    return await product.update(productData);
};

exports.deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Producto no encontrado');

    await product.destroy();
    return { message: 'Producto eliminado con éxito' };
};


exports.getLatestFiveProducts = async () => {
    const products = await Product.findAll({
        limit: 5, // Limita los resultados a 5 productos
        order: [['createdAt', 'DESC']], // Ordena por la fecha de creación en orden descendente
        include: {
            model: Category, // Incluye el modelo relacionado
            attributes: ['id', 'name'], // Campos que deseas del modelo Category
            as: 'categoria'
        },
    });

    // Mapeo de productos para devolver los resultados con nombre de categoría
    const result = products.map(product => {
        return {
            id: product.id,
            name: product.nombre,
            priceLista: product.precioLista,
            price: product.precioVenta,
            stock: product.stock,
            descripcion: product.descripcion,
            imageUrl: product.imageUrl,
            brand: product.marca,
            categoriaName: product.categoria?.name || null,
            categoriaId: product.categoriaId,
            imagenes: product.imagenes,
            disponible: product.disponible,
        };
    });

    return result;
};

exports.getLatestProducts = async () => {
    const products = await Product.findAll({
        limit: 1, // Limita los resultados a 5 productos
        order: [['createdAt', 'DESC']], // Ordena por la fecha de creación en orden descendente
        include: {
            model: Category, // Incluye el modelo relacionado
            attributes: ['id', 'name'], // Campos que deseas del modelo Category
            as: 'categoria'
        },
    });

    // Mapeo de productos para devolver los resultados con nombre de categoría
    const result = products.map(product => {
        return {
            id: product.id,
            name: product.nombre,
            priceLista: product.precioLista,
            price: product.precioVenta,
            stock: product.stock,
            descripcion: product.descripcion,
            imageUrl: product.imageUrl,
            brand: product.marca,
            categoriaName: product.categoria?.name || null,
            categoriaId: product.categoriaId,
            imagenes: product.imagenes,
            disponible: product.disponible,
            
        };
    });

    return result;
};

exports.searchProduct = async (query) => {
    if(!query) {
        throw new Error("No econtramos ese producto.");
    }

    try {
        const results = await Product.findAll({
          where: {
            nombre: {
              [Op.like]: `%${query}%`, // Busca en cualquier parte del título
            },
          },
          limit: 10, // Limitar los resultados para mejorar el rendimiento
        });
    
        return results;
      } catch (error) {
        console.error("Error al buscar productos:", error);
        throw new Error("Ocurrió un error al buscar productos.");
      }
    };
