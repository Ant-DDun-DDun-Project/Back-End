require('dotenv').config();
const env = process.env;

const development = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_NAME,
  host: env.DB_HOST,
  dialect: 'mysql',
  logging: false,
};

const production = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_NAME,
  host: env.DB_HOST,
  dialect: 'mysql',
  logging: false,
};

const test = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_NAME,
  host: env.DB_HOST,
  dialect: 'mysql',
  logging: false,
};

module.exports = { development, production, test };
