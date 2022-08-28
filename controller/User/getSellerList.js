const { User } = require('../../models');

async function getSellerList(response) {
  return User.findAll({
    attributes: ['email', 'firstName', 'lastName'],
    where: {
      userType: 'seller'
    }
  }).then((sellerList) => {
    return response.send({ success: true, data: sellerList });
  });
}

module.exports = getSellerList;
