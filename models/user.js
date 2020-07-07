'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notNull: {
          msg: "firstName 不能为空"
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notNull: {
          msg: "lastName 不能为空"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notNull: {
          msg: "email 不能为空"
        },
        isEmail: true,
        isEmail: {
          msg: "email 格式错误"
        },
      }

    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};