const express = require("express");
const router = express.Router();

// 폴더이름/라우터이름/메서드
// post
router.get("/", require("./postGET"));
// router.get("/", async (req, res) => {
//   res.status(200).send("잘됨");
// });


// router.get("/:id", async (req, res) => {
//   res.status(200).send("잘됨");
// });
router.get("/:id", require("./postIdGET"));


// router.post("/", async (req, res) => {
//   res.status(200).send("포스팅하기");
// });
router.post("/", require("./postPOST"));


// router.put("/:id", async (req, res) => {
//   res.status(200).send("포스팅 수정 하기");
// });
router.put("/:id", require("./postIdPUT"));
router.delete("/:id", require("./postIdDelete"));

module.exports = router;
