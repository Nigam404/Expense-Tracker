const express = require("express");
const premiumController = require("../controller/premiumC");

const router = express.Router();

router.get("/premium/leaderboard-data", premiumController.getLeaderBoardData);

module.exports = router;
