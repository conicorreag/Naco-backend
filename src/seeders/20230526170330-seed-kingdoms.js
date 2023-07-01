module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Kingdoms', [
    {
      id: 1, 
      name: 'Reino del Norte',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Reino de la Roca',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Reino de la Tormenta',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: 'Reino del Valle',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: 'Reino de los Rios',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Kingdoms', null, {}),
};
