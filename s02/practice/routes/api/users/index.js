const express = require("express");
const router = express.Router();

// /api/users

router.post("/login", require("./usersLoginPOST"));
router.post("/signup", require("./usersSignupPOST"));

module.exports = router;