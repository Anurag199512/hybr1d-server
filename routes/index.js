const express = require('express');

const Router = express.Router();

// importing routes
const register = require('./User/registration');
const login = require('./User/login');
const listSeller = require('./User/Buyer/listSeller');
const buildCatalog = require('./User/Seller/buildCatalog');
const checkOrderList = require('./User/Seller/checkOrderList');
const fetchSellersCatalog = require('./User/Buyer/fetchSellersCatalog');
const orderProducts = require('./User/Buyer/order');

const apiRoutes = Router.use('/api/auth/register', register)
  .use('/api/auth/login', login)
  .use('/api/buyer/list-of-sellers', listSeller)
  .use('/api/seller/create-catalog', buildCatalog)
  .use('/', fetchSellersCatalog)
  .use('/', orderProducts)
  .use('/api/seller/orders', checkOrderList)

module.exports = apiRoutes;
