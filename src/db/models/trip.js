/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trip.init({
    tripid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    driverid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientphonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    triporigin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tripdestination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tripstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};