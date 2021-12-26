const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/auth', require('./auth'));

module.exports = router;
