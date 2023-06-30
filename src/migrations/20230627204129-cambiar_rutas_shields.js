/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const shields = [
      { id: 1, img: '../../assets/stark.png' },
      { id: 2, img: '../../assets/baratheon.png' },
      { id: 3, img: '../../assets/targarian.png' },
    ];

    for (const shield of shields) {
      await queryInterface.sequelize.query(
        `UPDATE "Shields" SET img = '${shield.img}' WHERE id = ${shield.id}`,
      );
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('shields');
     */
  },
};
