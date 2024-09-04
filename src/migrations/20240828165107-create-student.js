'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no_tlp: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      imageId: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING(2083)
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.ENUM('MALE', 'FEMALE')
      },
      domicile: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('student');
  }
};