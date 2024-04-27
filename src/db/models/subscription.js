/* eslint-disable no-unused-vars */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscription.init({
    subid: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    driverid: {
      type: DataTypes.STRING,
      unique: true,
    },
    planid: DataTypes.STRING,
    subprice: DataTypes.DOUBLE,
    paymentmethod: DataTypes.STRING,
    startdate: DataTypes.STRING,
    enddate: DataTypes.STRING,
    nextbillingdate: DataTypes.STRING,
    substatus: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};