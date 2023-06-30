const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Kingdom, {
        foreignKey: 'kingdomId',
      });
    }
  }
  Goal.init({
    userId: DataTypes.INTEGER,
    kingdomId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Goal',
  });
  return Goal;
};
