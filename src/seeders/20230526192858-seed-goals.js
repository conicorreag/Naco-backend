module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Goals', [
    {
       
      userId: null,
      kingdomId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      
      userId: null,
      kingdomId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      
      userId: null,
      kingdomId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      
      userId: null,
      kingdomId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      
      userId: null,
      kingdomId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Goals', null, {}),
};
