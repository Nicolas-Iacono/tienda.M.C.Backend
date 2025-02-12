const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Products = require('../Product');
const User = require('../User');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  timestamps: true, // Esto te permite saber cuándo se creó el like
  uniqueKeys: {
    unique_user_product: {
      fields: ['userId', 'productId'], // Evita que un usuario dé like más de una vez al mismo producto
    },
  },
});

module.exports = Like;
