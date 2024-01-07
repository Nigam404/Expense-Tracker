const sequelize = require("../utils/database");
const Sequelize = require("sequelize");

const Expense = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  catagory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
