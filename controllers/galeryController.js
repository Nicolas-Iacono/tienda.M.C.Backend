const galeryService = require('../services/galeryService');

const createGalery = async (req, res) => {
    try {
        const { userId } = req.params;
        const { profileImage, images } = req.body;
        
        const galery = await galeryService.createGalery(parseInt(userId), {
            profileImage,
            images: images || []
        });
        
        res.status(201).json(galery);
    } catch (error) {
        console.error('Error creating galery:', error);
        if (error.message === 'El usuario ya tiene una galería') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

const getGaleryByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const galery = await galeryService.getGaleryByUserId(parseInt(userId));
        res.json(galery);
    } catch (error) {
        console.error('Error getting galery:', error);
        if (error.message === 'Galería no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

const updateGalery = async (req, res) => {
    try {
        const { userId } = req.params;
        const { profileImage, images } = req.body;
        
        const galery = await galeryService.updateGalery(parseInt(userId), {
            profileImage,
            images
        });
        
        res.json(galery);
    } catch (error) {
        console.error('Error updating galery:', error);
        if (error.message === 'Galería no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

const addImages = async (req, res) => {
    try {
        const { userId } = req.params;
        const { images } = req.body;
        
        if (!Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar un array de imágenes' });
        }
        
        const galery = await galeryService.addImages(parseInt(userId), images);
        res.json(galery);
    } catch (error) {
        console.error('Error adding images:', error);
        if (error.message === 'Galería no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

const removeImage = async (req, res) => {
    try {
        const { userId } = req.params;
        const { imageUrl } = req.body;
        
        if (!imageUrl) {
            return res.status(400).json({ message: 'Debe proporcionar la URL de la imagen a eliminar' });
        }
        
        const galery = await galeryService.removeImage(parseInt(userId), imageUrl);
        res.json(galery);
    } catch (error) {
        console.error('Error removing image:', error);
        if (error.message === 'Galería no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

const updateProfileImage = async (req, res) => {
    try {
        const { userId } = req.params;
        const { profileImage } = req.body;
        
        if (!profileImage) {
            return res.status(400).json({ message: 'Debe proporcionar la URL de la imagen de perfil' });
        }
        
        const galery = await galeryService.updateProfileImage(parseInt(userId), profileImage);
        res.json(galery);
    } catch (error) {
        console.error('Error updating profile image:', error);
        if (error.message === 'Galería no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createGalery,
    getGaleryByUserId,
    updateGalery,
    addImages,
    removeImage,
    updateProfileImage
};
