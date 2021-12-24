const express = require('express');
const router = express.Router();

const {checkUser} = require("./../../../middlewares/auth")


router.get('/list', require('./userListGET'));

router.get('/:userId', require('./userGET'));
// 유저 먼저 확인
router.put('/:userId', checkUser, require('./userPUT'));
router.delete('/:userId', require('./userDELETE'));

module.exports = router;
