const { Catalog, Product } = require('../../../models');
const { Op } = require('sequelize');

async function getSellersCatalog(sellerId, response) {
  // TODO: Check if seller exist

  const catalogDetail = await Catalog.findOne({
    where: {
      userId: sellerId
    }
  });

  if (!catalogDetail) {
    return response.send({ success: true, message:'Seller has not created any catalog' });
  }

  return Product.findAll({
    where: {
      id: {
        [Op.in]: catalogDetail.products
      }
    }
  }).then((products) => {
    return response.send({ success: true, products });
  });
}

module.exports = getSellersCatalog;
