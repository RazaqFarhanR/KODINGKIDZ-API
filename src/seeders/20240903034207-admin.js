'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(12);
    const hashPass = await bcrypt.hash('admin123', salt);

    await queryInterface.bulkInsert('admin', [
      {
        id: uuidv4(),
        username: 'admin',
        password: hashPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Hapus data seed dari tabel admin
    await queryInterface.bulkDelete('admin', { username: 'admin' }, {});
  },
};
