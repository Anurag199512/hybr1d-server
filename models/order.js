module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    products: Sequelize.DATATYPES.JSON
  }, {
    freezeTableName: true,
    timestamps: true
  });

  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Order;
};