// var express = require('express');
// var router = express.Router();

// /* /api/blog/post*/
// router.get('/', function(req, res, next) {
//     res.send('respond: api/blog');
//   });

// module.exports = router;

module.exports = async (req, res) => {
    res.send('GET respond: api/blog/post');
};