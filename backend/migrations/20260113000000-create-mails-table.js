/** @type {import('sequelize-cli').Migration} */
export default {

  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Mails', {
      mailId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      senderId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      senderEmail: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      recipientEmail: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('sent', 'failed', 'draft'),
        allowNull: false,
        defaultValue: 'draft',
      },
      direction: {
        type: Sequelize.ENUM('sent', 'received'),
        allowNull: true,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Mails');
  }
};
