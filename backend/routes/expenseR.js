const express = require("express");
const expenseController = require("../controller/expenseC");

const router = express.Router();
router.get("/getExp", expenseController.getExpense);
router.post("/postExp", expenseController.postExpense);
router.delete("/deleteExp/:expId", expenseController.deleteExpense);

module.exports = router;
