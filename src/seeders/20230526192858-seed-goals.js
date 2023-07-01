module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Goals', [
    {
      id: 1,
      userId: null,
      kingdomId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      userId: null,
      kingdomId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      userId: null,
      kingdomId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      userId: null,
      kingdomId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      userId: null,
      kingdomId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Goals', null, {}),
};
