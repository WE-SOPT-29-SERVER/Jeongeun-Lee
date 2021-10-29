const express = require("express");
const router = express.Router();
// response 데이터 형식 지정
const util = require("./../../../lib/util");
const responseMessage = require("./../../../constants/responseMessage");
const statusCode = require("./../../../constants/statusCode");

const posts = require("./../../../dbMockup/posting");

// URI: localhost:3000/post/:id

// RESPONSE DATA: POSTING 정보
module.exports = async (req, res) => {
  const { title, content } = req.body;

  // request data 확인 - 없다면 Null Value 반환
  if (!title || !content) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  // 성공
  res
    .status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.POST_SUCCESS, newPost));
};
