const express = require("express");
const router = express.Router();

// 폴더이름/라우터이름/메서드
// post
router.get("/", require("./postGET"));

router.get("/:id", require("./postIdGET"));

router.post("/", require("./postPOST"));

router.put("/:id", require("./postIdPUT"));
router.delete("/:id", require("./postIdDELETE"));

module.exports = router;
