const express = require("express");
const router = express.Router();

// router.use("/")
// /api/blog

router.get("/post", require("./blogPostGET"));
router.post("/post", require("./blogPostPOST"));

module.exports = router;
