/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // Add userId column to Tasks table
    await queryInterface.addColumn('Tasks', 'userId', {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove userId column from Tasks table
    await queryInterface.removeColumn('Tasks', 'userId');
  }
};
