const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Product = sequelize.define('Product', {

  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
    set(value) {
      // Guardamos el valor original y en minúsculas
      this.setDataValue('nombre', value);
      this.setDataValue('nombreLowerCase', value.toLowerCase());
    }
  },
  nombreLowerCase: {
    type: DataTypes.TEXT,
    allowNull: true // Lo hacemos nullable para poder agregarlo a la tabla existente
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
    type: DataTypes.JSON, 
    allowNull: true,      
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
},
alto: {
  type: DataTypes.FLOAT,
  allowNull: false,
  defaultValue: 0
},
ancho: {
  type: DataTypes.FLOAT,
  allowNull: false,
  defaultValue: 0
},
largo: {
  type: DataTypes.FLOAT,
  allowNull: false,
  defaultValue: 0
},
peso: {
  type: DataTypes.FLOAT,
  allowNull: false,
  defaultValue: 0
}
},{
  timestamps: true, // Habilita timestamps
});




module.exports = Product;
