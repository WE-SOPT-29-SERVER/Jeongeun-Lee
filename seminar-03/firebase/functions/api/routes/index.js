const express = require("express");
const router = express.Router();

// router.use("/")
// /api/user
router.use("/user", require("./user"));
router.use("/post", require("./posting"));

module.exports = router;
