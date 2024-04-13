/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trips', {
      tripid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      driverid: {
        type: Sequelize.STRING,
      },
      clientname: {
        type: Sequelize.STRING,
      },
      clientphonenumber: {
        type: Sequelize.STRING,
      },
      triporigin: {
        type: Sequelize.STRING,
      },
      tripdestination: {
        type: Sequelize.STRING,
      },
      tripstatus: {
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
    await queryInterface.dropTable('Trips');
  },
};