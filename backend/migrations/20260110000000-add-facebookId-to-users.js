export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "facebookId", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "facebookId");
  }
};
