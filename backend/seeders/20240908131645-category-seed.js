// migrations/YYYYMMDDHHMMSS-seed-categories.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'قانون مدني',
        description: 'يشمل قواعد تنظيم العلاقات بين الأفراد في الأمور المدنية مثل العقود والملكية والتعويضات.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'قانون تجاري',
        description: 'يركز على تنظيم الأنشطة التجارية والعلاقات بين الشركات والتجار، بما في ذلك عقود البيع والشراء والإفلاس.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'قانون العقوبات',
        description: 'يشمل القوانين التي تحدد الجرائم والعقوبات، وطرق محاكمة المجرمين وتنفيذ العقوبات.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'قانون الأسرة',
        description: 'يشمل القوانين المتعلقة بالزواج، الطلاق، الحضانة، والنفقة، وكل ما يتعلق بالأمور الأسرية.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
