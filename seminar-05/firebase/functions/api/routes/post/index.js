const express = require('express');
const router = express.Router();

const { checkUser } = require('../../../middlewares/auth');

router.get('/list', require('./postListGET'));
router.get('/:postId', require('./postGET'));
router.put('/:postId', checkUser, require('./postPUT'));
router.delete('/:postId', checkUser, require('./postDELETE'));
router.post('/', checkUser, require('./postPOST'));

module.exports = router;