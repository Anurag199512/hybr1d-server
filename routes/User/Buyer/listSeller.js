const express = require('express');
const passport = require('passport');

// import controller
const getSellerList = require('../../../controller/User/Buyer/getSellerList');
const defaultMessage = require('../../../defaultMessage');

const Router = express.Router();

Router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.type !== 'buyer') {
    res.send({ success: false, error: defaultMessage.incorrectUserType });
  }

  return getSellerList(res);
});

module.exports = Router;
