/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Games', 'current_turn', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Games', 'turn1', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Games', 'turn2', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Games', 'turn3', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'current_turn');
  },
};
