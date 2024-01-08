const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const signRouter = require("./routes/signR");
const expenseRouter = require("./routes/expenseR");

const User = require("./models/userM");
const Expense = require("./models/expenseM");

const sequelize = require("./utils/database");

const app = express();

//middlewares
app.use(cors());
app.use(bodyparser.json());

//routes
app.use(signRouter);
app.use(expenseRouter);

//association
User.hasMany(Expense);
Expense.belongsTo(User);

//...
sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
