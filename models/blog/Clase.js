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

// Establecer la relación con Seccion
Clase.associate = (models) => {
    Clase.belongsTo(models.Seccion, {
        foreignKey: 'seccionId',
        as: 'seccion'
    });
};

module.exports = Clase;