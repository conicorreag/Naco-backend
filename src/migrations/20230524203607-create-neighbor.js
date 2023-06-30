/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Neighbors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      territoryId: {
        type: Sequelize.INTEGER,
        references: { model: 'Territories', key: 'id' },
      },
      neighbor1: {
        type: Sequelize.INTEGER,
        references: { model: 'Territories', key: 'id' },
      },
      neighbor2: {
        type: Sequelize.INTEGER,
        references: { model: 'Territories', key: 'id' },
      },
      neighbor3: {
        type: Sequelize.INTEGER,
        references: { model: 'Territories', key: 'id' },
      },
      neighbor4: {
        type: Sequelize.INTEGER,
        references: { model: 'Territories', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Neighbors');
  },
};
