/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tansactions', {
      transactionid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      walletid: {
        type: Sequelize.STRING,
      },
      driverid: {
        type: Sequelize.STRING,
      },
      transactiontype: {
        type: Sequelize.STRING,
      },
      transamount: {
        type: Sequelize.DOUBLE,
      },
      paymentid: {
        type: Sequelize.STRING,
      },
      debitedaccount: {
        type: Sequelize.STRING,
      },
      transsource: {
        type: Sequelize.STRING,
      },
      transactionstatus: {
        type: Sequelize.STRING,
      },
      comment: {
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
    await queryInterface.dropTable('Tansactions');
  },
};