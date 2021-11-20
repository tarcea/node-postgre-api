const db = require('./db');

module.exports = {
  users: async () => {
    const { rows } = await db.query(db.GET_ALL_USERS);
    return rows;
  },
  addUser: async obj => {
    await db.query(db.ADD_USER, Object.values(obj));
  },
  login: async email => {
    const { rows } = await db.query(db.GET_BY_EMAIL, [email]);
    return rows[0];
  },
  delete: async email => {
    await db.query(db.DELETE_USER, [email])
  }
}