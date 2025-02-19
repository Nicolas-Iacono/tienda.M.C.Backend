const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderDetail = sequelize.define('OrderDetail', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
}, {
    tableName: 'order_details',
    timestamps: true,
    underscored: true
});

module.exports = OrderDetail;
