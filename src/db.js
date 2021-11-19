const { Pool } = require('pg');

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
  GET_ALL_USERS: 'SELECT * FROM users'
}