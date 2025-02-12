const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Importar los modelos
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order'); // Si tienes un modelo para órdenes
const User = require('./User'); // Si tienes un modelo para usuarios
const Address = require('././userInfo/Address');
const Phone = require('././userInfo/Phone');
const Authorities = require('././userInfo/Authorities');
const Like = require('./user-Product/Like')
const OrderDetail = require('./OrderDetail')

// Definir relaciones entre modelos
Category.hasMany(Product, { foreignKey: 'categoriaId',});
Product.belongsTo(Category, { foreignKey: 'categoriaId', as: 'categoria'});

User.belongsToMany(Authorities, {
  through: 'UserAuthorities', // Nombre de la tabla intermedia
  foreignKey: 'userId',       // Llave foránea que apunta a `User`
  otherKey: 'authorityId',    // Llave foránea que apunta a `Authorities`
  as: 'authorities',          // Alias para la relación
});

Authorities.belongsToMany(User, {
  through: 'UserAuthorities', // Nombre de la tabla intermedia
  foreignKey: 'authorityId',  // Llave foránea que apunta a `Authorities`
  otherKey: 'userId',         // Llave foránea que apunta a `User`
  as: 'users',                // Alias para la relación
})

Like.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Like.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(Like, { foreignKey: 'userId' });
Product.hasMany(Like, { foreignKey: 'productId' });


User.hasOne(Phone, {
  foreignKey: { name: 'userId', allowNull: false }, // Nombre explícito de clave foránea
  as: 'phone',
});
Phone.belongsTo(User, {
  foreignKey: { name: 'userId', allowNull: false }, // Nombre explícito de clave foránea
});

User.hasOne(Address, {
  foreignKey: { name: 'userId', allowNull: false }, // Nombre explícito de clave foránea
  as: 'address',
});
Address.belongsTo(User, {
  foreignKey: { name: 'userId', allowNull: false }, // Nombre explícito de clave foránea
});


    
OrderDetail.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
OrderDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.hasMany(OrderDetail, { foreignKey: 'orderId', as: 'orderDetails' });
// Exportar modelos y Sequelize
module.exports = {
  sequelize,
  Category,
  Product,
  Order,
  User,
  Address,
  Phone,
  Authorities,
  Like,
  OrderDetail
};