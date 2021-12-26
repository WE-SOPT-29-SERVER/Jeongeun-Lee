const express = require("express");
const router = express.Router();
// response 데이터 형식 지정
const util = require("./../../../lib/util");
const responseMessage = require("./../../../constants/responseMessage");
const statusCode = require("./../../../constants/statusCode");

const posts = require("./../../../dbMockup/posting");

// URI: localhost:3000/post/

// RESPONSE DATA: posting 정보
module.exports = async (req, res) => {
  // 성공
  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.POST_READING_SUCCESS, posts)
  );
};
