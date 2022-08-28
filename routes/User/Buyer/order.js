const express = require('express');
const passport = require('passport');

// import controller
const order = require('../../../controller/User/Buyer/order');
const defaultMessage = require('../../../defaultMessage');

const Router = express.Router();

Router.post('/api/buyer/create-order/:seller_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.type !== 'buyer') {
    res.send({ success: false, error: defaultMessage.incorrectUserType });
  }

  if (!req.params.seller_id) {
    res.send({ success: false, error: defaultMessage.sellerIdMissing });
  }

  return order(req, res, req.params.seller_id);
});

module.exports = Router;
