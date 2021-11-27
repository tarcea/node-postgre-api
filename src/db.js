const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
  user: 'gpgxtshe',
  host: 'balarama.db.elephantsql.com',
  database: 'gpgxtshe',
  password: process.env.DB_PASSWORD,
  port: 5432,
});
pool.connect();

module.exports = {
  query: async (text, params) => pool.query(text, params),
  GET_ALL_USERS: 'SELECT * FROM users',
  ADD_USER: `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  `,
  GET_BY_EMAIL: `SELECT * FROM users WHERE email = $1`,
  DELETE_USER: `DELETE FROM users WHERE email = $1`,
  FIND_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1`,
  FIND_USER_BY_NAME: `SELECT * FROM users WHERE name = $1`
}