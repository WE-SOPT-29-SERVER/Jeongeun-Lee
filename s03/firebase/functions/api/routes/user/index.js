const express = require("express");
const router = express.Router();

// router.use("/")
// /api/user/signup
router.post("/signup", require("./userSignupPost"));
// router.post("/login", require("./userLoginPost"));
router.get("/test", require("./userTestGet"));
module.exports = router;
