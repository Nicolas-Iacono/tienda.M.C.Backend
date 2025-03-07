const { Galery, User } = require('../models/index');

exports.createGalery = async (userId, data) => {
    const existingGalery = await Galery.findOne({ where: { userId } });
    if (existingGalery) {
        throw new Error('El usuario ya tiene una galería');
    }
    return await Galery.create({ ...data, userId });
};

exports.getGaleryByUserId = async (userId) => {
    const galery = await Galery.findOne({
        where: { userId },
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'first_name', 'last_name', 'email']
        }]
    });
    if (!galery) {
        throw new Error('Galería no encontrada');
    }
    return galery;
};

exports.updateGalery = async (userId, data) => {
    const galery = await Galery.findOne({ where: { userId } });
    if (!galery) {
        throw new Error('Galería no encontrada');
    }
    return await galery.update(data);
};

exports.addImages = async (userId, newImages) => {
    const galery = await Galery.findOne({ where: { userId } });
    if (!galery) {
        throw new Error('Galería no encontrada');
    }
    
    const currentImages = galery.images || [];
    const updatedImages = [...currentImages, ...newImages];
    
    return await galery.update({ images: updatedImages });
};

exports.removeImage = async (userId, imageUrl) => {
    const galery = await Galery.findOne({ where: { userId } });
    if (!galery) {
        throw new Error('Galería no encontrada');
    }
    
    const currentImages = galery.images || [];
    const updatedImages = currentImages.filter(img => img !== imageUrl);
    
    return await galery.update({ images: updatedImages });
};

exports.updateProfileImage = async (userId, profileImage) => {
    const galery = await Galery.findOne({ where: { userId } });
    if (!galery) {
        // Si no existe la galería, la creamos con la imagen de perfil
        return await Galery.create({
            userId,
            profileImage,
            images: []
        });
    }
    
    return await galery.update({ profileImage });
};
