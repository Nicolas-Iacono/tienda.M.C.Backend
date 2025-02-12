const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Phone = sequelize.define('Phone', {
  area_code: { type: DataTypes.STRING, allowNull: false },
  number: { type: DataTypes.STRING, allowNull: false },
});


module.exports = Phone;

