const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const OrderDetail = require('./OrderDetail');

const Order = sequelize.define('Order', {
    preferenceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    statusDetail: {
      type: DataTypes.STRING,
      allowNull: true
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
    paymentApprovedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    buyerInfo: {
      type: DataTypes.JSON,
      allowNull: true
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: true
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
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id'
      }
    }
}, {
    tableName: 'orders',
    timestamps: true,
    underscored: true
});



module.exports = Order;
