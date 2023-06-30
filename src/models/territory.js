const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Territory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Shield, {
        foreignKey: 'shieldId',
      });
      this.belongsTo(models.Kingdom, {
        foreignKey: 'kingdomId',
      });
      this.hasMany(models.Neighbor, {
        foreignKey: 'id',
      });
    }
  }
  Territory.init({
    userId: DataTypes.INTEGER,
    kingdomId: DataTypes.INTEGER,
    shieldId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Territory',
  });
  return Territory;
};
