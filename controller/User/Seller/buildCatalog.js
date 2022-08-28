const joi = require('@hapi/joi');
const db = require('../../../models/index');

const { Catalog, Product } = require('../../../models');

async function buildCatalog(request, response) {
  const schema = joi.object({
    items: joi.array().items(joi.object({
      name : joi.string().required(),
      price : joi.number().precision(2).required()
    }))
  });

  const transaction = await db.sequelize.transaction();
  const { error } = schema.validate(request.body);

  if (error) {
    return response.status(400).send({ success: false, error: error.details[0].message });
  }

  try {
    const sellerId = request.user.user_id;

    // create multiple product
    const products = await Product.bulkCreate(request.body.items);
  
    // find ids of all newly created product
    const productIds = products.map((product) => product.id)
  
    const catalogForSellerExist = await Catalog.findOne({
      where: {
        userId: sellerId
      }
    });
  
    if (catalogForSellerExist) {
      // update catalog with product ids for seller if a catalog already exist
      await Catalog.update(
        {
          products: productIds
        },
        {
          where: {
            userId: sellerId
          }
        }
      )
    } else {
      // create a new catalog for seller
      await Catalog.create(
        {
          userId: sellerId,
          products: productIds
        }
      )
    }
  
    await transaction.commit();
    response.send({ success: true, products, productIds });
  } catch(e) {
    await transaction.rollback();
    response.send({ success: false, error: e });
  }
}

module.exports = buildCatalog;
