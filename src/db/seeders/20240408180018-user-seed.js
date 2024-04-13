/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

dotenv.config();
const { v4: uuidv4 } = uuid;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        userid: uuidv4(),
        firstname: 'admin',
        lastname: 'user',
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
        email: process.env.ADMIN_EMAIL,
        phonenumber: process.env.ADMIN_PHONE_NUMBER,
        username: process.env.ADMIN_USERNAME,
        userrole: 'SUPPER_ADMIN',
        status: 'STATUS',
        extid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
