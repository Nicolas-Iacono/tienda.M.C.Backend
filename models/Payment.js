const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');

const Payment = sequelize.define('Payment', {
  paymentId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'payment_id'
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id'
    },
    field: 'order_id'
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  statusDetail: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'status_detail'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  payerEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'payer_email'
  },
  payerName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'payer_name'
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'payment_method'
  },
  dateCreated: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'date_created'
  },
  dateApproved: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'date_approved'
  }
}, {
  tableName: 'payments',
  timestamps: true,
  underscored: true
});

// Definir la relación con Order
Payment.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order'
});

module.exports = Payment;