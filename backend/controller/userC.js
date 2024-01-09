const User = require("../models/userM");

exports.getUser = async (req, res, next) => {
  const userId = req.params.userID;
  const user = await User.findByPk(userId);
  res.json(user);
};

exports.updateTotalExpense = async (req, res, next) => {
  const id = req.user.id;
  const amount = Number(req.body.amount); //because req.body.amount is coming as a string
  const user = await User.findByPk(id);

  console.log("type check->", typeof amount, typeof user.totalexpense);
  
  if (!user.totalexpense) {
    user.update({ totalexpense: amount });
  } else {
    const newTotal = user.totalexpense + amount;
    user.update({ totalexpense: newTotal });
  }
  res.json({ message: "Total expense updated" });
};
