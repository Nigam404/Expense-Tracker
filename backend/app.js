const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const signRouter = require("./routes/signR");
const sequelize = require("./utils/database");

const app = express();

//middlewares
app.use(bodyparser.json());
app.use(cors());

//routes
app.use(signRouter);

//...
sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
