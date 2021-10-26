var express = require('express');
var router = express.Router();



/* /api */
router.get('/', function(req, res, next) {
  res.send('respond: api');
});

router.use("/test", require("./test"));
router.use("/blog", require("./blog"));
router.use("/users", require("./users"));


router.use("", require("./cake"));

module.exports = router;
