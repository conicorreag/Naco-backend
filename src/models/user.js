const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Territory, {
        foreignKey: 'id',
      });
      this.hasOne(models.Shield, {
        foreignKey: 'id',
      });
      this.hasOne(models.Goal, {
        foreignKey: 'id',
      });
      this.hasMany(models.Game, {
        foreignKey: 'id',
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      // validate: {
      //   isAlphanumeric: {
      //     msg: 'The username can only contain letters and numbers'
      //   }
      // },
    },
    password: {
      type: DataTypes.STRING,
      // validate: {
      //   isValidPassword(value) {
      // 		if(!value.match(/[a-z]/) || !value.match(/[0-9]/))  {
      // 			throw new Error('Password must contain at least one letter and one number');
      // 		}
      //   }
      // },
    },
    // turn: DataTypes.BOOLEAN
    playing: DataTypes.BOOLEAN,
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please provide a valid email address',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
