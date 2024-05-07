/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SupPlans', {
      planid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      plantname: {
        type: Sequelize.STRING,
        unique: true,
      },
      plandescription: {
        type: Sequelize.STRING,
      },
      planplice: {
        type: Sequelize.DOUBLE,
      },
      validitydays: {
        type: Sequelize.INTEGER,
      },
      planstatus: {
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
    await queryInterface.dropTable('SupPlans');
  },
};