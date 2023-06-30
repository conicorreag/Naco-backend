const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Kingdom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Goal, {
        foreignKey: 'id',
      });
      this.hasMany(models.Territory, {
        foreignKey: 'id',
      });
    }
  }
  Kingdom.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Kingdom',
  });
  return Kingdom;
};
