const Sequelize = require("sequelize");

const sequelize = new Sequelize("nigamdb", "root", "Nigam@12345", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
