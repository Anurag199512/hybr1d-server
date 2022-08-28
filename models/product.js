module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(12, 2)
  }, {
    freezeTableName: true,
    timestamps: true
  });

  Product.associate = (models) => {
    // associations can be defined here
  };

  return Product;
};
