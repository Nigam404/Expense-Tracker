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

exports.login = async (req, res, next) => {
  //finding the user with entered mail.
  const response = await User.findAll({
    where: {
      mail: req.body.mail,
    },
  });

  //if user found with entered mail.
  if (response.length > 0) {
    //checking password
    if (response[0].password == req.body.password) {
      res.status(200).json({ message: "Login Successful!!!" });
    } else {
      res.status(401).send("User Not Authorized!");
    }
  }
  //if user not found.
  else {
    res.status(404).send("User Not Found!");
  }
};
