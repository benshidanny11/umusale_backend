/* eslint-disable no-unused-vars */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SupPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SupPlan.init({
    planid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    plantname: DataTypes.STRING,
    plandescription: DataTypes.STRING,
    planplice: DataTypes.DOUBLE,
    planstatus: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SupPlan',
  });
  return SupPlan;
};