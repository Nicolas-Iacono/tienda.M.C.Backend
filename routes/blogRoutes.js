const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog/blogController');

// Middleware para logging de rutas
router.use((req, res, next) => {
    console.log(`Blog Route: ${req.method} ${req.url}`);
    next();
});

// Rutas para Secciones
router.post('/secciones', blogController.createSeccion);
router.get('/secciones', blogController.getSecciones);
router.get('/secciones/:id', blogController.getSeccionById);
router.delete('/secciones/:id', blogController.deleteSeccion);

// Rutas para Clases
router.post('/clases', blogController.createClase);
router.get('/secciones/:seccionId/clases', blogController.getClasesBySeccion);

// Rutas para Suscripciones
router.post('/suscripciones', blogController.createSuscripcion);
router.get('/secciones/:seccionId/suscripciones', blogController.getSuscripcionesBySeccion);

module.exports = router;