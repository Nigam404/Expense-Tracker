const express = require("express");
const userController = require("../controller/userC");
const router = express.Router();

router.get("/getuser/:userID", userController.getUser);

module.exports = router;
