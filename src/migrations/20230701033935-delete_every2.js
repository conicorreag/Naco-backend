/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DELETE FROM "Neighbors"');
    await queryInterface.sequelize.query('DELETE FROM "Territories"');
    await queryInterface.sequelize.query('DELETE FROM "Goals"');
    await queryInterface.sequelize.query('DELETE FROM "Games"');
    await queryInterface.sequelize.query('DELETE FROM "Kingdoms"');
    await queryInterface.sequelize.query('DELETE FROM "Shields"');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
