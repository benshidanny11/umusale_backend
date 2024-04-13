/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-dupe-keys */
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    username: process.env.DB_USER,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
  },
  production: {
    connectionString: '',
    dialect: 'postgres',
  },
};
