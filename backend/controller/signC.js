const User = require("../models/signM");
exports.signUp = async (req, res, next) => {
  //checking if user is already registered.
  let existingUser = await User.findAll({ where: { mail: req.body.mail } });
  //if user found
  if (existingUser.length > 0) {
    res.json({ remark: "User Already Exist" });
  }
  //if user not found
  else {
    const response = await User.create({
      name: req.body.name,
      mail: req.body.mail,
      password: req.body.password,
    });
    res.status(201).json(response.dataValues);
  }
};
