const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Suscripcion = sequelize.define('Suscripcion', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    items: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    },
    seccionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Seccions',
            key: 'id'
        }
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

module.exports = Suscripcion;