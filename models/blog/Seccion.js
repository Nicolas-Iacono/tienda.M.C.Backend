const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Seccion = sequelize.define('Seccion', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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

module.exports = Seccion;