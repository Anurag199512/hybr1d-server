const express = require('express');
const passport = require('passport');

// import controller
const buildCatalog = require('../../../controller/User/Seller/buildCatalog');
const defaultMessage = require('../../../defaultMessage');

const Router = express.Router();

Router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.type !== 'seller') {
    res.send({ success: false, error: defaultMessage.incorrectUserType});
  }

  return await buildCatalog(req, res);
});

module.exports = Router;
