'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Galeries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'URL de la imagen de perfil del usuario'
      },
      images: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de URLs de imágenes del usuario'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Crear índice para mejorar el rendimiento de búsquedas por userId
    await queryInterface.addIndex('Galeries', ['userId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Galeries');
  }
};
