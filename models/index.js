const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Importar los modelos
const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');
const Address = require('./userInfo/Address');
const Phone = require('./userInfo/Phone');
const Authorities = require('./userInfo/Authorities');
const Like = require('./user-Product/Like');
const Order = require('./Order');
const OrderDetail = require('./OrderDetail');
const Payment = require('./Payment');
const Seccion = require('./blog/Seccion');
const Clase = require('./blog/Clase');
const Suscripcion = require('./blog/Suscripcion');

// Definir relaciones entre modelos
Category.hasMany(Product, { foreignKey: 'categoriaId' });
Product.belongsTo(Category, { foreignKey: 'categoriaId', as: 'categoria' });

// Relaciones de User
User.belongsToMany(Authorities, {
  through: 'user_authorities',
  foreignKey: 'userId',
  otherKey: 'authorityId',
  as: 'authorities'
});

Authorities.belongsToMany(User, {
  through: 'user_authorities',
  foreignKey: 'authorityId',
  otherKey: 'userId',
  as: 'users'
});

// Relaciones de Like
Like.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Like.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Like, { foreignKey: 'userId' });
Product.hasMany(Like, { foreignKey: 'productId' });

// Relaciones de información de usuario
User.hasOne(Phone, {
  foreignKey: 'userId',
  as: 'phone'
});

Phone.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasOne(Address, {
  foreignKey: 'userId',
  as: 'address'
});

Address.belongsTo(User, {
  foreignKey: 'userId'
});

// Relaciones de Order y OrderDetail
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.hasMany(OrderDetail, { foreignKey: 'orderId', as: 'orderDetails' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
OrderDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
OrderDetail.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Relaciones de Payment
Payment.belongsTo(User, { foreignKey: 'userId', as: 'customer' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });

// Relaciones del Blog
Seccion.hasMany(Clase, {
  foreignKey: 'seccionId',
  as: 'clases'
});

Clase.belongsTo(Seccion, {
  foreignKey: 'seccionId',
  as: 'seccion'
});

Clase.belongsTo(Product, {
  foreignKey: 'productoId',
  as: 'product'
});

Product.hasMany(Clase, {
  foreignKey: 'productoId',
  as: 'clases'
});

// Relaciones de Suscripcion
Seccion.hasMany(Suscripcion, {
  foreignKey: 'seccionId',
  as: 'suscripciones'
});

Suscripcion.belongsTo(Seccion, {
  foreignKey: 'seccionId',
  as: 'seccion'
});

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
  OrderDetail,
  Payment,
  Seccion,
  Clase,
  Suscripcion
};