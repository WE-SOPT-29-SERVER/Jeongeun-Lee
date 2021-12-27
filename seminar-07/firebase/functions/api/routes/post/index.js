const express = require('express');
const router = express.Router();

const { checkUser } = require('../../../middlewares/auth');

const uploadImage = require('./../../../middlewares/uploadImage')

router.get('/list', require('./postListGET'));
router.get('/:postId', require('./postGET'));
router.put('/:postId', checkUser, require('./postPUT'));
router.delete('/:postId', checkUser, require('./postDELETE'));
router.post('/', checkUser, uploadImage, require('./postPOST'));

module.exports = router;