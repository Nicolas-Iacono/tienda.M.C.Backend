'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Clases', 'cardBgColor', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '#000000'
    });

    await queryInterface.addColumn('Clases', 'cardTextColor', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '#FFFFFF'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Clases', 'cardBgColor');
    await queryInterface.removeColumn('Clases', 'cardTextColor');
  }
};
