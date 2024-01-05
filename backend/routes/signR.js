const express = require("express");
const signController = require("../controller/signC");
const router = express.Router();

router.post("/signup", signController.signUp);

module.exports = router;
