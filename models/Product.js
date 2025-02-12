const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Product = sequelize.define('Product', {
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  precioLista: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  precioVenta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  marca:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  descripcion:{
    type:DataTypes.TEXT,
    allowNull: true,
  },
  stock:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoriaId:{
    type: DataTypes.INTEGER,
  },
  imagenes: {
    type: DataTypes.JSON, // Aquí usamos JSON para almacenar un array
    allowNull: true,      // Puede ser null si no es obligatorio
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
},
updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
},
disponible:{
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: true,
}
},{
  timestamps: true, // Habilita timestamps
});




module.exports = Product;
