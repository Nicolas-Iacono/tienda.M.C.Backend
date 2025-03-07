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

exports.deleteSeccion = async (id) => {
    try {
        console.log('Service - Intentando eliminar sección con ID:', id);
        
        // Primero verificamos que la sección exista
        const seccion = await Seccion.findByPk(id, {
            include: [
                { model: Clase, as: 'clases' },
                { model: Suscripcion, as: 'suscripciones' }
            ]
        });

        console.log('Service - Sección encontrada:', seccion);

        if (!seccion) {
            console.log('Service - Sección no encontrada');
            throw new Error('Sección no encontrada');
        }

        // Eliminamos primero las relaciones
        if (seccion.clases && seccion.clases.length > 0) {
            console.log('Service - Eliminando clases relacionadas');
            await Clase.destroy({ where: { seccionId: id } });
        }

        if (seccion.suscripciones && seccion.suscripciones.length > 0) {
            console.log('Service - Eliminando suscripciones relacionadas');
            await Suscripcion.destroy({ where: { seccionId: id } });
        }

        // Eliminamos la sección
        console.log('Service - Eliminando la sección');
        await seccion.destroy();
        
        console.log('Service - Sección eliminada exitosamente');
        return true;
    } catch (error) {
        console.error('Service - Error al eliminar sección:', error);
        throw error;
    }
};

exports.deleteClase = async (id) => {
    try {
        console.log('Service - Intentando eliminar clase con ID:', id);
        
        // Verificamos que la clase exista
        const clase = await Clase.findByPk(id);

        console.log('Service - Clase encontrada:', clase);

        if (!clase) {
            console.log('Service - Clase no encontrada');
            throw new Error('Clase no encontrada');
        }

        // Eliminamos la clase
        console.log('Service - Eliminando la clase');
        await clase.destroy();
        
        console.log('Service - Clase eliminada exitosamente');
        return true;
    } catch (error) {
        console.error('Service - Error al eliminar clase:', error);
        throw error;
    }
};
