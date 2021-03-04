const {hashing} = require('../helpers/bcrypt')

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
    email: {
      type : DataTypes.STRING,
      unique : true,
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password is required"
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (user)=>{
        user.password = hashing(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};