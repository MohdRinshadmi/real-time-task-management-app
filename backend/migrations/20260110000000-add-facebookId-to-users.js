export default {
  up: async (queryInterface, Sequelize) => {
    // Check if column already exists before adding
    const table = await queryInterface.describeTable("Users");
    if (!table.facebookId) {
      await queryInterface.addColumn("Users", "facebookId", {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "facebookId");
  }
};
