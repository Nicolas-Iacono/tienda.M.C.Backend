const express = require('express');
const router = express.Router();
const galeryController = require('../controllers/galeryController');


// Middleware para logging
router.use((req, res, next) => {
    console.log(`Galery Route: ${req.method} ${req.url}`);
    next();
});



// Crear galería para un usuario
router.post('/users/:userId/galery', galeryController.createGalery);

// Obtener galería de un usuario
router.get('/users/:userId/galery', galeryController.getGaleryByUserId);

// Actualizar galería completa
router.put('/users/:userId/galery', galeryController.updateGalery);

// Agregar imágenes a la galería
router.post('/users/:userId/galery/images', galeryController.addImages);

// Eliminar una imagen de la galería
router.delete('/users/:userId/galery/images', galeryController.removeImage);

// Actualizar imagen de perfil
router.put('/users/:userId/galery/profile-image', galeryController.updateProfileImage);

module.exports = router;
