const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Shield extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.hasMany(models.Territory, {
        foreignKey: 'id',
      });
    }
  }
  Shield.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Shield',
  });
  return Shield;
};
