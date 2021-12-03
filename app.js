const express = require('express');
const users = require('./src/users');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api/users', users);

app.listen(port, () => console.log(`server listening on port ${port}`));
