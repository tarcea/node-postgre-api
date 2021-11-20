const express = require('express');
const { passwordHashing, passwordDecryption } = require('./hashing');
const repository = require('./repository');

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
let loggedUserName = '';
router.get('/', async (req, res) => {
  const users = await repository.users()
  res
    .json(users)
    .status(201)
    .end()
})

router.post('/signup', async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await passwordHashing(password, 10);
  const user = await repository.addUser({ ...req.body, password: hashedPassword })
  res
    .json(user)
    .status(201)
    .end()
})

router.post('/login', async (req, res) => {
  const { password, email, name } = req.body
  const user = await repository.login(email);
  const cryptedHash = user.password;
  const isLoggedIn = await passwordDecryption(password, cryptedHash);
  loggedUserName = name;
  res
    .json(loggedUserName)
    .status(201)
    .end()
})

module.exports = router;