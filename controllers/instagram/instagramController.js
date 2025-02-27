const instagramClient = require('../../config/instagramClient');

// Obtener feed de Instagram
const getInstagramFeed = async (req, res) => {
    try {
        await instagramClient.login();
        const userFeed = await instagramClient.getPhotosByUsername({
            username: process.env.INSTAGRAM_USERNAME,
            first: 12 // número de posts a obtener
        });

        res.json({
            success: true,
            data: userFeed.user.edge_owner_to_timeline_media.edges
        });
    } catch (error) {
        console.error('Error al obtener feed de Instagram:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener feed de Instagram'
        });
    }
};

// Publicar en Instagram
const postToInstagram = async (req, res) => {
    try {
        const { imageUrl, caption } = req.body;

        if (!imageUrl || !caption) {
            return res.status(400).json({
                success: false,
                error: 'Se requiere URL de imagen y descripción'
            });
        }

        await instagramClient.login();
        await instagramClient.uploadPhoto({
            photo: imageUrl,
            caption: caption,
            post: 'feed'
        });

        res.json({
            success: true,
            message: 'Publicación realizada con éxito'
        });
    } catch (error) {
        console.error('Error al publicar en Instagram:', error);
        res.status(500).json({
            success: false,
            error: 'Error al publicar en Instagram'
        });
    }
};

// Obtener estadísticas básicas
const getInstagramStats = async (req, res) => {
    try {
        await instagramClient.login();
        const profile = await instagramClient.getProfile();

        res.json({
            success: true,
            data: {
                followers: profile.followers,
                following: profile.following,
                posts: profile.posts
            }
        });
    } catch (error) {
        console.error('Error al obtener estadísticas de Instagram:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener estadísticas de Instagram'
        });
    }
};

module.exports = {
    getInstagramFeed,
    postToInstagram,
    getInstagramStats
};
