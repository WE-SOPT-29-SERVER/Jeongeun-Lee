var express = require('express');
var router = express.Router();

/* /api/cake */
router.get('/cake', function(req, res, next) {
  res.send('respond: api/cake');
});



module.exports = router;
