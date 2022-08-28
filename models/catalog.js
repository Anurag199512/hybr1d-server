module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define('Catalog', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    products: DataTypes.JSON
  }, {
    freezeTableName: true,
    timestamps: true
  });

  Catalog.associate = (models) => {
    // associations can be defined here
    Catalog.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Catalog;
};
