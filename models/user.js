module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userType: DataTypes.ENUM('buyer', 'seller'),
    email: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: true
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasOne(models.Catalog, { foreignKey: 'userId' });
    User.hasMany(models.Order, { foreignKey: 'userId' });
  };

  return User;
};
