const express = require("express");
const router = express.Router();

// router.use("/")
// /user/signup
router.post("/signup", require("./userSignupPost"));
router.post("/login", require("./userLoginPost"));

module.exports = router;
