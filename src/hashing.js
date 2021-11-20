const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const plainText = 'secret';
// const loginPasswordString = 'sec ret';
// const cryptedHash = '$2b$10$usXgg75iZt13mNtchahQEOkDQCApWxUjD0DnpRS2rfowRF7oxPviq'

// bcrypt.genSalt(saltRounds)
//   .then(salt => {
//     bcrypt.hash(plainText, salt)
//       .then(hash => {
//         console.log(hash);
//       });
//   });
const passwordHashing = async (textPassword, saltRound) => {
  const hash = await bcrypt.hash(textPassword, saltRound);
  return hash;
}
const passwordDecryption = async (loginPasswordString, cryptedHash) => {
  const result = await bcrypt.compare(loginPasswordString, cryptedHash);
  return result;
}

// bcrypt.hash(plainText, saltRounds)
//   .then(hash => {
//     console.log(hash);
//   });

// Load hash from your database for the password.
// bcrypt.compare(loginPasswordString, cryptedHash)
//   .then(result => {
//     console.log(result);
//     // This will be either true or false, based on if the string
//     // matches or not.
//   });

module.exports = {
  passwordHashing, passwordDecryption
}