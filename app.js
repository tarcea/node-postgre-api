const express = require('express');
const users = require('./src/users');
const port = process.env.PORT || 3001;
const app = express();

app.use('/api/users', users);

app.listen(port, () => console.log(`server listening on port ${port}`))