const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Driver, { foreignKey: 'driverid' });
      this.belongsTo(models.Wallet, { foreignKey: 'walletid' });
    }
  }
  Transaction.init({
    transactionid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    walletid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driverid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactiontype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transamount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    paymentid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    debitedaccount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transsource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Tansaction',
  });
  return Transaction;
};