module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Shields', [
    {
      name: 'Stark',
      userId: null,
      img: 'stark.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Baretheon',
      userId: null,
      img: 'baratheon.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Targaryen',
      userId: null,
      img: 'targaryen.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Shields', null, {}),
};
