const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


 const Payment = sequelize.define('Payment', {
    payment_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payer_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
 
  }, {
    tableName: 'payments',
    timestamps: true,
  });


module.exports = Payment;