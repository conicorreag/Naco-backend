module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      username: 'naco',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'nacha',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'coni',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
