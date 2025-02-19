const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
}, {
    tableName: 'orders',
    timestamps: true,
    underscored: true
});

module.exports = Order;
