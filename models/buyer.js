module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: true
  });

  Buyer.associate = (models) => {
    // associations can be defined here
  };

  return Buyer;
};
