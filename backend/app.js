const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const signRouter = require("./routes/signR");
const expenseRouter = require("./routes/expenseR");
const purchaseRouter = require("./routes/purchaseR");
const userRouter = require("./routes/userR");
const premiumRouter = require("./routes/premiumR");
const forgotpasswordRouter = require("./routes/forgotpasswordR");

const User = require("./models/userM");
const Expense = require("./models/expenseM");
const Order = require("./models/orderM");
const Forgotpassword = require("./models/forgotPasswordM");

const sequelize = require("./utils/database");

const app = express();

//middlewares
app.use(cors());
app.use(bodyparser.json());

//routes
app.use(signRouter);
app.use(expenseRouter);
app.use(purchaseRouter);
app.use(userRouter);
app.use(premiumRouter);
app.use(forgotpasswordRouter);

//association
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);


//...SERVER
sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
