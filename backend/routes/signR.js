const express = require("express");
const signController = require("../controller/signC");
const router = express.Router();

router.post("/signup", signController.signUp);
router.post("/login", signController.login);
router.post("/password/forgotpassword", signController.forgotPassword);

module.exports = router;
