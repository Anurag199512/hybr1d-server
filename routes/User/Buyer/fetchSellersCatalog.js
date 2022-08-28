const express = require('express');
const passport = require('passport')

// import controller
const getSellersCatalog = require('../../../controller/User/Buyer/getSellersCatalog');
const defaultMessage = require('../../../defaultMessage');

const Router = express.Router();

Router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.type !== 'buyer') {
    res.send({ success: false, error: defaultMessage.incorrectUserType})
  }

  getSellersCatalog(req.query.sellerId, res);
});

module.exports = Router;
