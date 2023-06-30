const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Neighbor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Territory, {
        foreignKey: 'territoryId',
      });
      this.belongsTo(models.Territory, {
        foreignKey: 'neighbor1',
      });
      this.belongsTo(models.Territory, {
        foreignKey: 'neighbor2',
      });
      this.belongsTo(models.Territory, {
        foreignKey: 'neighbor3',
      });
      this.belongsTo(models.Territory, {
        foreignKey: 'neighbor4',
      });
    }
  }
  Neighbor.init({
    territoryId: DataTypes.INTEGER,
    neighbor1: DataTypes.INTEGER,
    neighbor2: DataTypes.INTEGER,
    neighbor3: DataTypes.INTEGER,
    neighbor4: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Neighbor',
  });
  return Neighbor;
};
