const express = require('express');

const Router = express.Router();

// importing routes
const register = require('./User/registration');
const login = require('./User/login');
const listSeller = require('./User/Buyer/listSeller');
const buildCatalog = require('./User/Seller/buildCatalog');


const apiRoutes = Router.use('/api/v1/register', register)
  .use('/api/v1/login', login)
  .use('/api/v1/list-seller', listSeller)
  .use('/api/v1/build-catalog', buildCatalog);

module.exports = apiRoutes;
