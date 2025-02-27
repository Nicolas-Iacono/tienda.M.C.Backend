const { Seccion, Clase, Suscripcion } = require('../models');

exports.getSeccionById = async (id) => {
    try {
        console.log('Service - Recibido ID:', id);
        console.log('Service - Tipo de ID:', typeof id);

        const seccion = await Seccion.findByPk(id, {
            include: [
                { 
                    model: Clase,
                    as: 'clases',
                    attributes: ['id', 'nombre', 'descripcion', 'instructor', 'dias', 'horaInicio', 'horaFin', 'imagen', 'activo']
                },
                { 
                    model: Suscripcion,
                    as: 'suscripciones',
                    attributes: ['id', 'nombre', 'precio', 'descripcion', 'items', 'activo']
                }
            ]
        });
        
        console.log('Service - Resultado de findByPk:', seccion);
        
        if (!seccion) {
            console.log('Service - No se encontró la sección');
            throw new Error('Sección no encontrada');
        }

        console.log('Service - Retornando sección encontrada');
        return seccion;
    } catch (error) {
        console.error('Service - Error:', error);
        throw error;
    }
};
