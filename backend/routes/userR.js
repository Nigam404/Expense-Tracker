const express = require("express");
const userController = require("../controller/userC");
const userAuthentication = require("../middlewares/authentication");

const router = express.Router();

router.get("/getuser/:userID", userController.getUser);
router.post(
  "/update-total-expense",
  userAuthentication.authenticate,
  userController.updateTotalExpense
);

module.exports = router;
