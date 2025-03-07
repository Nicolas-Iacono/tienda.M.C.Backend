const { Seccion, Clase, Suscripcion, Product } = require('../../models');
const blogService = require('../../services/blogService');

// Controladores para Secciones
const createSeccion = async (req, res) => {
    try {
        const { nombre, titulo, descripcion } = req.body;
        const seccion = await Seccion.create({
            nombre,
            titulo,
            descripcion,
            activo: true
        });
        res.status(201).json(seccion);
    } catch (error) {
        console.error('Error creating seccion:', error);
        res.status(500).json({ message: error.message });
    }
};

const getSecciones = async (req, res) => {
    try {
        const secciones = await Seccion.findAll({
            include: [
                { model: Clase, as: 'clases' },
                { model: Suscripcion, as: 'suscripciones' }
            ]
        });
        res.json(secciones);
    } catch (error) {
        console.error('Error getting secciones:', error);
        res.status(500).json({ message: error.message });
    }
};

const getSeccionById = async (req, res) => {
    try {
        console.log('Controller - Recibido ID:', req.params.id);
        console.log('Controller - Tipo de ID:', typeof req.params.id);
        
        const id = parseInt(req.params.id);
        console.log('Controller - ID convertido a número:', id);
        
        const seccion = await blogService.getSeccionById(id);
        console.log('Controller - Respuesta del servicio:', seccion);
        
        if (!seccion) {
            console.log('Controller - No se encontró la sección');
            return res.status(404).json({ message: 'Sección no encontrada' });
        }
        
        console.log('Controller - Enviando respuesta exitosa');
        res.json(seccion);
    } catch (error) {
        console.error('Controller - Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const deleteSeccion = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log('Controller - Intentando eliminar sección con ID:', id);
        console.log('Controller - Tipo de ID:', typeof id);
        
        if (isNaN(id)) {
            console.log('Controller - ID inválido');
            return res.status(400).json({ message: 'ID inválido' });
        }
        
        await blogService.deleteSeccion(id);
        
        console.log('Controller - Sección eliminada exitosamente');
        res.status(200).json({ message: 'Sección eliminada exitosamente' });
    } catch (error) {
        console.error('Controller - Error al eliminar sección:', error);
        if (error.message === 'Sección no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ 
            message: 'Error al eliminar la sección',
            error: error.message 
        });
    }
};

// Controladores para Clases
const createClase = async (req, res) => {
    try {
        const { nombre, descripcion, instructor, dias, horaInicio, horaFin, imagen, seccionId, productoId } = req.body;
        const clase = await Clase.create({
            nombre,
            descripcion,
            instructor,
            dias,
            horaInicio,
            horaFin,
            imagen,
            seccionId,
            productoId,
            activo: true
        });
        res.status(201).json(clase);
    } catch (error) {
        console.error('Error creating clase:', error);
        res.status(500).json({ message: error.message });
    }
};

const getClasesBySeccion = async (req, res) => {
    try {
        const { seccionId } = req.params;
        const clases = await Clase.findAll({
            where: { seccionId },
            include: [
                { model: Seccion, as: 'seccion' },
                { model: Product, as: 'product' }
            ]
        });
        res.json(clases);
    } catch (error) {
        console.error('Error getting clases by seccion:', error);
        res.status(500).json({ message: error.message });
    }
};

const deleteClase = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log('Controller - Intentando eliminar clase con ID:', id);
        
        if (isNaN(id)) {
            console.log('Controller - ID inválido');
            return res.status(400).json({ message: 'ID inválido' });
        }

        const clase = await Clase.findByPk(id);
        if (!clase) {
            console.log('Controller - Clase no encontrada');
            return res.status(404).json({ message: 'Clase no encontrada' });
        }

        await clase.destroy();
        console.log('Controller - Clase eliminada exitosamente');
        res.status(200).json({ message: 'Clase eliminada exitosamente' });
    } catch (error) {
        console.error('Controller - Error al eliminar clase:', error);
        res.status(500).json({ 
            message: 'Error al eliminar la clase',
            error: error.message 
        });
    }
};

// Controladores para Suscripciones
const createSuscripcion = async (req, res) => {
    try {
        const { nombre, precio, descripcion, items, seccionId } = req.body;
        const suscripcion = await Suscripcion.create({
            nombre,
            precio,
            descripcion,
            items,
            seccionId,
            activo: true
        });
        res.status(201).json(suscripcion);
    } catch (error) {
        console.error('Error creating suscripcion:', error);
        res.status(500).json({ message: error.message });
    }
};

const getSuscripcionesBySeccion = async (req, res) => {
    try {
        const { seccionId } = req.params;
        const suscripciones = await Suscripcion.findAll({
            where: { seccionId },
            include: [{ model: Seccion, as: 'seccion' }]
        });
        res.json(suscripciones);
    } catch (error) {
        console.error('Error getting suscripciones by seccion:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSeccion,
    getSecciones,
    getSeccionById,
    deleteSeccion,
    createClase,
    getClasesBySeccion,
    createSuscripcion,
    getSuscripcionesBySeccion,
    deleteClase
};
