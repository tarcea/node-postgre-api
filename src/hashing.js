const bcrypt = require('bcrypt');

const passwordHashing = async (textPassword, saltRound) => {
  const hash = await bcrypt.hash(textPassword, saltRound);
  return hash;
}
const passwordDecryption = async (loginPasswordString, cryptedHash) => {
  const result = await bcrypt.compare(loginPasswordString, cryptedHash);
  return result;
}

module.exports = {
  passwordHashing, passwordDecryption
}