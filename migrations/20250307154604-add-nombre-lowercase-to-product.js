'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero agregamos la columna como nullable
    await queryInterface.addColumn('Products', 'nombreLowerCase', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    // Obtenemos todos los productos existentes
    const products = await queryInterface.sequelize.query(
      'SELECT id, nombre FROM "Products"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Actualizamos cada producto con su versión en minúsculas
    for (const product of products) {
      await queryInterface.sequelize.query(
        'UPDATE "Products" SET "nombreLowerCase" = ? WHERE id = ?',
        {
          replacements: [product.nombre.toLowerCase(), product.id],
          type: Sequelize.QueryTypes.UPDATE
        }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'nombreLowerCase');
  }
};
