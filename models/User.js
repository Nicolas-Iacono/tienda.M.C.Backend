const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    registration_date:{   
                        type: DataTypes.DATE,
                        allowNull: false,
                        defaultValue: DataTypes.NOW },
    email: { type: DataTypes.STRING,  allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});


module.exports = User;
