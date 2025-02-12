const express = require('express');
const Like = require('../models/user-Product/Like')
const Product = require("../models/Product")
// Dar un like
const likeProduct = async (userId, productId) => {
  return await Like.findOrCreate({
    where: { userId, productId },
  });
};

// Quitar un like
const unlikeProduct = async (userId, productId) => {
  const like = await Like.findOne({ where: { userId, productId } });
  if (like) {
    await like.destroy();
    return true;
  }
  return false;
};

// Contar likes de un producto
const countLikes = async (productId) => {
  return await Like.count({ where: { productId } });
};

// Verificar si un usuario ha dado like
const hasLiked = async (productId, userId) => {
  const like = await Like.findOne({ where: { productId, userId } });
  return !!like; // Devuelve true si existe, false si no
};

//OBTENER LISTA COMPLETA DE LIKES POR USUARIO
const getUserLikesWithProducts = async (id) => {
  try {
    const likes = await Like.findAll({
      where: { userId: id }, // Filtro por el usuario
      include: [
        {
          model: Product, // Incluye el modelo relacionado Products
          // No es necesario usar el alias aquí
        },
      ],
    });

    console.log(JSON.stringify(likes, null, 2)); // Imprime los resultados
    return likes;
  } catch (error) {
    console.error('Error al obtener los likes con productos:', error);
    throw error;
  }
};

module.exports = {
  likeProduct,
  unlikeProduct,
  countLikes,
  hasLiked,
  getUserLikesWithProducts
};