const sequelize = require('../config/database');
const {
  Category,
  Product,
  Order,
  User,
  Address,
  Phone,
  Authorities,
  Like,
  OrderDetail
} = require('../models');

async function migrate() {
  try {
    console.log('Iniciando migración a PostgreSQL...');

    // Sincronizar todos los modelos
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada correctamente');

    // Crear roles por defecto
    const authorities = await Authorities.bulkCreate([
      { name: 'ROLE_USER' },
      { name: 'ROLE_ADMIN' }
    ]);
    console.log('Roles creados correctamente');

    // Crear categorías por defecto si es necesario
    const categories = await Category.bulkCreate([
      { name: 'Electrónica' },
      { name: 'Ropa' },
      { name: 'Hogar' },
      { name: 'Deportes' }
    ]);
    console.log('Categorías creadas correctamente');

    console.log('Migración completada exitosamente');
  } catch (error) {
    console.error('Error durante la migración:', error);
    process.exit(1);
  }
}

// Ejecutar la migración
migrate();
