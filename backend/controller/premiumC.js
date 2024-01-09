const Expense = require("../models/expenseM");
const User = require("../models/userM");
const sequelize = require("../utils/database");
exports.getLeaderBoardData = async (req, res, next) => {
  try {
    //METHOD-1 USING SEQUELIZE JOIN....
    // //getting data by joining users and expenses table using sequelize ORM.
    // const userWithTotalExpenses = await User.findAll({
    //   attributes: [
    //     "id",
    //     "name",
    //     [sequelize.fn("sum", sequelize.col("expenses.amount")), "total_cost"],
    //   ],
    //   include: [{ model: Expense, attributes: [] }],
    //   group: ["user.id"],
    //   order: [["total_cost", "DESC"]],
    // });
    // res.json(userWithTotalExpenses);

    //METHOD-2 FROM USER TABLE'S TOTALEXPENSE DATA.
    const userInfo = await User.findAll({
      attributes: ["name", "totalexpense"],
      order: [["totalexpense", "DESC"]],
    });
    res.json(userInfo);
  } catch (error) {
    //catch block
    console.log(error);
  }
};
