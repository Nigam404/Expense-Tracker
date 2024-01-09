const Expense = require("../models/expenseM");
const User = require("../models/userM");
const sequelize = require("../utils/database");
exports.getLeaderBoardData = async (req, res, next) => {
  try {
    //getting data by joining users and expenses table using sequelize ORM.
    const userWithTotalExpenses = await User.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("sum", sequelize.col("expenses.amount")), "total_cost"],
      ],
      include: [{ model: Expense, attributes: [] }],
      group: ["user.id"],
      order: [["total_cost", "DESC"]],
    });
    res.json(userWithTotalExpenses);
  } catch (error) {
    //catch block
    console.log(error);
  }
};
