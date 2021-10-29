const express = require("express");
const router = express.Router();

// 폴더이름/라우터이름/메서드
// router.get("/", async (req, res) => {
//   res.status(404).send("잘됨");
// });

router.post("/signup", require("./userSignupPOST"));
router.post("/login", require("./userLoginPOST"));
router.get("/profile/:id", require("./userProfileGET"));
router.get("/:id", require("./userProfileGET"));

router.put("/update/:id", require("./userUpdatePUT"));
router.delete("/delete/:id", require("./userDeleteDELETE"));

module.exports = router;
