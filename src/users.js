const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const repository = require('./repository');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.JWT_SECRET;


const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

router.get('/', async (req, res) => {
  const users = await repository.users()
  res.json(users)
})

router.post('/signup', async (req, res) => {
  try {
    const { password, email, name } = req.body;
    const checkUserEmail = await repository.findUserByEmail(email);
    const checkUserName = await repository.findUserByName(name);
    console.log(checkUserEmail, checkUserName)
    if (checkUserEmail || checkUserName) {
      return res.status(400).json({
        "errors": [
          {
            "msg": "The name or email already exists",
          }
        ]
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await repository.addUser({
      ...req.body,
      password: hashedPassword
    });
    const token = await JWT.sign({
      email
    }, secret, {
      expiresIn: 36000
    })
    res.status(201).json({ token })
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
    const isLoggedIn = await bcrypt.compare(password, user.password);
    const token = await JWT.sign({
      email
    }, secret, {
      expiresIn: 36000
    })
    if (isLoggedIn) {
      res.json({ token })
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