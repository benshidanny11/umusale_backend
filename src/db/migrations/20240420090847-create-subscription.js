/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscriptions', {
      subid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      driverid: {
        type: Sequelize.STRING,
        unique: true,
      },
      planid: {
        type: Sequelize.STRING,
      },
      subprice: {
        type: Sequelize.DOUBLE,
      },
      paymentmethod: {
        type: Sequelize.STRING,
      },
      startdate: {
        type: Sequelize.STRING,
      },
      enddate: {
        type: Sequelize.STRING,
      },
      nextbillingdate: {
        type: Sequelize.STRING,
      },
      substatus: {
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
    await queryInterface.dropTable('Subscriptions');
  },
};