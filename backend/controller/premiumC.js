const Expense = require("../models/expenseM");
const User = require("../models/userM");
exports.getLeaderBoardData = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    const users = await User.findAll();
    //map for storing userid and their total expenses
    const totalExpenses = {};

    expenses.forEach((expense) => {
      if (totalExpenses[expense.userId]) {
        //if key already exist in userTotalExpenses
        totalExpenses[expense.userId] += expense.amount;
      }
      //if key is coming first time to userTotalExpenses
      else {
        totalExpenses[expense.userId] = expense.amount;
      }
    });

    //for storing user name and total expenses.
    const userWithTotalExpenses = [];
    users.forEach((user) => {
      userWithTotalExpenses.push({
        name: user.name,
        total: totalExpenses[user.id],
      });
    });

    res.json(userWithTotalExpenses);
  } catch (error) {
    console.log(error);
  }
};
