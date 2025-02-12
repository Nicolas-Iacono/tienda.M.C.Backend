const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const OrderDetail = require('./OrderDetail');

const Order = sequelize.define('Order', {
    // ID autogenerado
    preferenceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'Orders'
  });



  




module.exports = Order;
