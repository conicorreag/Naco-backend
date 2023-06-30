/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      { id: 1, mail: 'naco@gmail.com' },
      { id: 2, mail: 'nacha@gmail.com' },
      { id: 3, mail: 'coni@gmail.com' },
    ];

    for (const user of users) {
      await queryInterface.sequelize.query(
        `UPDATE "Users" SET mail = '${user.mail}' WHERE id = ${user.id}`,
      );
    }
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
