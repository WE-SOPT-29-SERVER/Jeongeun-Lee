var express = require('express');
var router = express.Router();

/* GET users listing. */
// hello/world
router.get('/world', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
