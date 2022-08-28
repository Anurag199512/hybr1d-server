const express = require('express');
const passport = require('passport');

// import controller
const listOrders = require('../../../controller/User/Seller/listOrders');
const defaultMessage = require('../../../defaultMessage');

const Router = express.Router();

Router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.type !== 'seller') {
    res.send({ success: false, error: defaultMessage.incorrectUserType });
  }

  return await listOrders(req.user.user_id, res);
});

module.exports = Router;
