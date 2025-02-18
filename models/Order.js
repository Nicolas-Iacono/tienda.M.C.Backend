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
    },
    shippingAddress: {
      type: DataTypes.STRING, // O DataTypes.JSON si quieres guardar la dirección como un objeto JSON
      allowNull: true // Permite valores nulos si el envío no es necesario
    },
    shippingZipCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shippingDimensions: { // Alto x Ancho x Largo,Peso (en cm y kg)
      type: DataTypes.STRING,
      allowNull: true
    },
    shippingLogisticType: { // me2, me1, custom, etc.
      type: DataTypes.STRING,
      allowNull: true
    },
    shippingCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    shippingStatus: { // Creado, En camino, Entregado, etc.
      type: DataTypes.STRING,
      allowNull: true
    },
    shipmentId: { // ID del envío en Mercado Libre (si aplica)
      type: DataTypes.STRING,
      allowNull: true
    },
    trackingNumber: { // Número de seguimiento del envío
      type: DataTypes.STRING,
      allowNull: true
    }
    }, {
    tableName: 'Orders'
    });



  




module.exports = Order;
