const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Authorities = sequelize.define('Authorities', {
  role: { type: DataTypes.STRING, allowNull: false },
  
});

module.exports = Authorities;