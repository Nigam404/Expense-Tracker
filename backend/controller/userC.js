const User = require("../models/userM");

exports.getUser = async (req, res, next) => {
  const userId = req.params.userID;
  const user = await User.findByPk(userId);
  res.json(user);
};
