const Like = require('../../models/user-Product/Like');
const likeService = require('../../services/likeService');
const Product = require('../../models/Product');
// Dar un like
const likeProduct = async (req, res) => {
  
  const { userId, productId } = req.body;
  try {
    // Verificar si ya existe el like
    const existingLike = await Like.findOne({
      where: { userId, productId },
    });

    if (existingLike) {
      return res.status(400).json({
        message: "Ya diste like a este producto.",
      });
    }

    // Crear el nuevo like
    const newLike = await Like.create({ userId, productId });
    return res.status(201).json({
      message: "Like creado correctamente.",
      data: newLike,
    });
  } catch (error) {
    console.error("Error al crear el like:", error);
    return res.status(500).json({
      message: "Error al dar like.",
      error: error.message,
    });
  }
};


// Quitar un like
const unlikeProduct = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const result = await likeService.unlikeProduct(userId, productId);
    if (!result) {
      return res.status(404).json({ message: 'Like no encontrado.' });
    }
    res.status(200).json({ message: 'Like eliminado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al quitar like.', error: error.message });
  }
};

// Contar likes de un producto
const countLikes = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const count = await likeService.countLikes(productId);
    res.status(200).json({ productId, likes: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al contar likes.', error: error.message });
  }
};

// Verificar si un usuario ha dado like
const hasLiked = async (req, res) => {
  const { id: productId, userId } = req.params;

  try {
    // Verificar si existe un registro del like en la base de datos
    const like = await Like.findOne({
      where: {
        productId,
        userId,
      },
    });

    if (like) {
      return res.status(200).json({ hasLiked: true, message: "El usuario ya dio like a este producto." });
    }

    return res.status(200).json({ hasLiked: false, message: "El usuario no ha dado like a este producto." });
  } catch (error) {
    console.error("Error al verificar like:", error);
    return res.status(500).json({ message: "Error al verificar el like.", error: error.message });
  }
};
const getUserLikesWithProducts = async (req, res) => {
  const { userId } = req.params; // Obtén el ID del usuario desde los parámetros de la ruta

  try {
    const likes = await Like.findAll({
      where: { userId }, // Filtro por ID del usuario
      include: [
        {
          model: Product, // Incluye el modelo relacionado Product
          // No es necesario usar el alias aquí
        },
      ],
    });

    if (likes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron likes para este usuario.' });
    }

    res.status(200).json(likes); // Devuelve los likes con los productos
  } catch (error) {
    console.error('Error al obtener los likes con productos:', error);
    res.status(500).json({ error: 'Error al obtener los likes con productos.' });
  }
};

module.exports = {
  likeProduct,
  unlikeProduct,
  countLikes,
  hasLiked,
  getUserLikesWithProducts 
};
