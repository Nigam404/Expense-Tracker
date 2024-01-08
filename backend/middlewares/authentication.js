const jwt = require("jsonwebtoken");
const User = require("../models/userM");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization"); //extracting the token passed in req header from frontend.
    console.log("TOKEN->", token);

    const user = jwt.verify(token, "nigamkalpataru"); //decoding user info by token and secret key.
    const foundUser = await User.findByPk(user.userId); //userId is user's property passed during token generation.
    req.user = foundUser; //passing user to next middleware by common 'req' object.
    next();
  } catch (error) {
    console.log(error);
  }
};
