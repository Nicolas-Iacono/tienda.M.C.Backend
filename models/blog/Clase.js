const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Clase = sequelize.define('Clase', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    instructor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dias: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    },
    horaInicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horaFin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    cardBgColor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '#000000'
    },
    cardTextColor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '#FFFFFF'
    },
    seccionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Seccions',
            key: 'id'
        }
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Products',
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

// Establecer las relaciones
Clase.associate = (models) => {
    Clase.belongsTo(models.Seccion, {
        foreignKey: 'seccionId',
        as: 'seccion'
    });
    Clase.belongsTo(models.Product, {
        foreignKey: 'productoId',
        as: 'product'
    });
};

module.exports = Clase;