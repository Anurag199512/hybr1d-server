const express = require('express');

// import controller
const registerUser = require('../../controller/User/register');

const Router = express.Router();

Router.post('/', (req, res) => {
  registerUser(req, res);
});

module.exports = Router;
