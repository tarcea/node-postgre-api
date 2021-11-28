const dotenv = require('dotenv');
const { Pool } = require('pg');
const fs = require('fs');

const users = fs.readFileSync('./src/queries/users.sql').toString();
console.log(users)

dotenv.config();

const pool = new Pool({
  user: 'gpgxtshe',
  host: 'balarama.db.elephantsql.com',
  database: 'gpgxtshe',
  password: process.env.DB_PASSWORD,
  port: 5432,
});
pool.connect();


pool.query(users).then(() => console.log('users done'))
