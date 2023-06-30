const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'winner',
      });
    }
  }
  Game.init({
    winner: DataTypes.INTEGER,
    turn1: DataTypes.INTEGER,
    turn2: DataTypes.INTEGER,
    turn3: DataTypes.INTEGER,
    current_turn: DataTypes.INTEGER,
    playing: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
