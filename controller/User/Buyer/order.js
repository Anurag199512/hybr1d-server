const { Order, Catalog } = require('../../../models');
const joi = require('@hapi/joi');
const db = require('../../../models/index');
const defaultMessage = require('../../../defaultMessage');

async function orderProduct(request, response, sellerId) {
  const schema = joi.object({
    productIds: joi.array().items(joi.number()).required()
  });

  const { error } = schema.validate(request.body);

  if (error) {
    return response.status(400).send({ success: false, error: error.details[0].message });
  }
  const transaction = await db.sequelize.transaction();

  try {
    const catalogDetail = await Catalog.findOne({
      where: {
        userId: sellerId
      }
    });

    // find ids of product requested bu buyer
    const productIds = request.body.productIds;
    if (productIds.length === 0) {
      return response.status(400).send({ success: false, error: defaultMessage.missingProductDetails });
    }

    // verify that seller sells the product requested by buyer
    let orderCanBePlaced = true;
    const productSoldBySeller = catalogDetail.products;
    productIds.forEach(productId => {
      if (!productSoldBySeller.includes(productId)) {
        // seller does not sell this product id
        orderCanBePlaced = false;
      }
    });

    if (!orderCanBePlaced) {
      return response.status(400).send({ success: false, error: defaultMessage.multipleSellerProductInOrder });
    }

    await Order.create({
      userId: request.user.user_id,
      products: productIds,
      sellerId
    })

    await transaction.commit()

    return response.send({ success: true, message: defaultMessage.orderPlaced });
  } catch (e) {
    await transaction.rollback();
    return response.send({ success: false, error: e });
  }

}

module.exports = orderProduct;
