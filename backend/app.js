const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const signRouter = require("./routes/signR");
const expenseRouter = require("./routes/expenseR");
const sequelize = require("./utils/database");

const app = express();

//middlewares
app.use(cors());
app.use(bodyparser.json());

//routes
app.use(signRouter);
app.use(expenseRouter);

//...
sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
