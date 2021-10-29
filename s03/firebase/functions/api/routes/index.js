const express = require("express");
const router = express.Router();

// router.use("/")
// /api/user
router.use("/user", require("./user"));


module.exports = router;
