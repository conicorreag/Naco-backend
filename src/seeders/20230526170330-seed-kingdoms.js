module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Kingdoms', [
    {
      name: 'Reino del Norte',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Reino de la Roca',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Reino de la Tormenta',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Reino del Valle',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Reino de los Rios',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Kingdoms', null, {}),
};
