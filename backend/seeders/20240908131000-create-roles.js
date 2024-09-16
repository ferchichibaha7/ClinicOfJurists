// seeders/XXXXXX-create-roles.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = [
      { name: 'ADMIN', createdAt: new Date(), updatedAt: new Date() },
      { name: 'STUDENT', createdAt: new Date(), updatedAt: new Date() },
      { name: 'USER', createdAt: new Date(), updatedAt: new Date() }
    ];

    return queryInterface.bulkInsert('Roles', roles, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
