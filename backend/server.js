const express = require('express');
require('dotenv').config();
const app = require('./app.js');
const port = process.env.PORT;


app.app.listen(port, () => console.log(`ToDo app listening at http://localhost:${port}`));
