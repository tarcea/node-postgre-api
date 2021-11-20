const express = require('express');
const { passwordHashing, passwordDecryption } = require('./hashing');
const repository = require('./repository');

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', async (req, res) => {
  const users = await repository.users()
  res
    .json(users)
    .status(201)
    .end()
})

router.post('/', async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await passwordHashing(password, 10);
    const user = await repository.addUser({
      ...req.body,
      password: hashedPassword
    });
    res.send('user created')
  } catch (err) {
    res.status(500).send()
  }
})

router.post('/login', async (req, res) => {
  const { password, email } = req.body
  const user = await repository.login(email);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    const isLoggedIn = await passwordDecryption(password, user.password);
    if (isLoggedIn) {
      res.send('success')
    } else {
      res.send('not allowed')
    }
  } catch (err) {
    res.status(500).send();
  }
})

router.delete('/:email', async (req, res) => {
  const { email } = req.params;
  const user = await repository.login(email);
  if (user == null) {
    return res.status(400).send('Cannot find a user with this email');
  }
  try {
    await repository.delete(email);
  } catch (err) {
    return res.status(500).send();
  }
  res.send('deleted')
})

module.exports = router;