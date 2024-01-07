const Expense = require("../models/expenseM");

//getting expense controller...............................................................................
module.exports.getExpense = async (req, res, next) => {
  const expenses = await Expense.findAll();
  res.json(expenses);
};

//post or adding expense controller........................................................................
module.exports.postExpense = async (req, res, next) => {
  //req.body is the object pass by axios from front-end.
  const savedData = await Expense.create({
    //leftside is Expense model props and rightside is the user passed value.
    amount: req.body.amount,
    description: req.body.description,
    catagory: req.body.catagory,
  });
  console.log("data saved in DB");
  res.json(savedData.dataValues);
};

//delete controller......................................................................................
module.exports.deleteExpense = async (req, res, next) => {
  const id = req.params.expId;
  const expense = await Expense.findByPk(id);
  res.json(expense);
  await expense.destroy();
  console.log("Expense info removed from DB");
};
