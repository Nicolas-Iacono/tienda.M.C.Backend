const productService = require('../../services/productService');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener producto', error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
    }
};

exports.getLatestFiveProducts = async (req, res) => {
    try {
        const latestProducts = await productService.getLatestFiveProducts();
        res.status(200).json(latestProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los últimos productos', error: error.message });
    }
};
exports.getLatestProducts = async (req, res) => {
    try {
        const latestProducts = await productService.getLatestProducts();
        res.status(200).json(latestProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los últimos productos', error: error.message });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
    
        if (!query) {
          return res.status(400).json({ message: "Debes proporcionar un término de búsqueda." });
        }
    
        const results = await productService.searchProduct(query);
        res.json(results);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    
  
