const categoryService = require('../../services/categoryService');

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategory();
    
        if (!categories || categories.length === 0) {
          return res.status(404).json({ message: 'No se encontraron categorías' });
        }
    
        return res.json(categories);
      } catch (error) {
        return res.status(500).json({
          message: 'Error al obtener categorías',
          error: error.message,
        });
      }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Category', error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const newCategory = await categoryService.createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear categoria', error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar Category', error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const result = await categoryService.deleteCategory(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar category', error: error.message });
    }
};


exports.getCategoriesWithProducts = async (req, res) => {
    try {
      const categories = await getAllCategory();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories with products' });
    }
  };
