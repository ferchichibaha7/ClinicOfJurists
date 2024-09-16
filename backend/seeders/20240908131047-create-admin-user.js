// seeders/XXXXXX-create-admin-user.js
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const adminUser = {
      name: 'marwa',
      password: hashedPassword,
      email: 'marwabarhoumi@gmail.com',
      phone_number: '29204755',
      active: true,
      role_id: 1, // Assuming role_id 1 represents the ADMIN role
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return queryInterface.bulkInsert('Users', [adminUser], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { name: 'marwa' }, {});
  }
};
