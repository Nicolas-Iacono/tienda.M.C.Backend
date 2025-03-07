const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Galery = sequelize.define('Galery', {
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'URL de la imagen de perfil del usuario'
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de URLs de imágenes del usuario'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true
});

// Establecer las relaciones
Galery.associate = (models) => {
    Galery.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
    });
};

module.exports = Galery;