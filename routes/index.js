const express = require('express');

const Router = express.Router();

// importing routes
const register = require('./User/registration');
const login = require('./User/login');

const apiRoutes = Router.use('/api/v1/register', register)
  .use('/api/v1/login', login);

module.exports = apiRoutes;
