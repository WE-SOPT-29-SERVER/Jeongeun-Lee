var express = require('express');
var router = express.Router();

/* /api/test */
router.get('/', function(req, res, next) {
  res.send('respond: api/test');
});



module.exports = router;
