const express = require('express');
const passport = require('passport');

// import controller
const getSellersCatalog = require('../../../controller/User/Buyer/getSellersCatalog');
const defaultMessage = require('../../../defaultMessage');

const Router = express.Router();

Router.get('/api/buyer/seller-catalog/:seller_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.type !== 'buyer') {
    res.send({ success: false, error: defaultMessage.incorrectUserType });
  }

  if (!req.params.seller_id) {
    res.send({ success: false, error: defaultMessage.sellerIdMissing });
  }

  getSellersCatalog(req.params.seller_id, res);
});

module.exports = Router;
