module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Shields', [
    {
      id: 1,
      name: 'Stark',
      userId: null,
      img: 'stark.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Baretheon',
      userId: null,
      img: 'baratheon.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Targaryen',
      userId: null,
      img: 'targaryen.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Shields', null, {}),
};
