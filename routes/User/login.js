const express = require('express');

// import controller
const login = require('../../controller/User/login');

const Router = express.Router();

Router.post('/', (req, res) => {
  login(req, res);
});

module.exports = Router;
