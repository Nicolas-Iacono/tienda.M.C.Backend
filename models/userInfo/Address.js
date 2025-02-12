const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Address = sequelize.define('Address', {
  zip_code: { type: DataTypes.STRING, allowNull: false },
  street_name: { type: DataTypes.STRING, allowNull: false },
  street_number: { type: DataTypes.INTEGER, allowNull: false },
  city_name: { type: DataTypes.STRING },
  floor: { type: DataTypes.STRING },
  apartment: { type: DataTypes.STRING },
});

module.exports = Address;