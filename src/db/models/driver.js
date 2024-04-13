const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    static associate(models) {
      this.hasMany(models.Wallet, { foreignKey: 'driverid' });
    }
  }
  Driver.init({
    driverid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profileimage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drivinglicenceimage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drivingnglicenceid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};
