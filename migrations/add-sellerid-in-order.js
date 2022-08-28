module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Order',
        'sellerId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Order', 'sellerId')
    ]);
  }
};
