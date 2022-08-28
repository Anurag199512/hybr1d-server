const { Order, Product } = require('../../../models');
const { Op } = require('sequelize');

// list of product order by user's
async function listProductOrders(sellerId, response) {
  const result = [];
  
  const orders = await Order.findAll({
    where: {
      sellerId
    }
  });


  for (const order of orders) {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price'],
      where: {
        id: {
          [Op.in]: order.products
        }
      }
    });

    result.push({
      orderId: order.id,
      products
    });
  }

  response.send({ success: true, orders: result })
}

module.exports = listProductOrders;
