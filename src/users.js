const express = require('express');
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

module.exports = router;