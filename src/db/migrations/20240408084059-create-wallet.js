/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wallets', {

      walletid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      driverid: {
        type: Sequelize.STRING,
      },
      balance: {
        type: Sequelize.DOUBLE,
      },
      walletstatus: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Wallets');
  },
};