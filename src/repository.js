const db = require('./db');

module.exports = {
  users: async () => {
    const { rows } = await db.query(db.GET_ALL_USERS);
    return rows;
  },
}