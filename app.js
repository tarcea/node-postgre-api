const express = require('express');
const users = require('./src/users');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`server listening on port ${port}`))