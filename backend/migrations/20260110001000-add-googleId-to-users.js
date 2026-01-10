export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "googleId", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "googleId");
  }
};
