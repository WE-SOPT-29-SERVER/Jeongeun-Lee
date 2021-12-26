const express = require("express");
const router = express.Router();
// response 데이터 형식 지정
const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

const posts = require("./../../dbMockup/posting");

// URI: localhost:3000/post/:id

// RESPONSE DATA: POSTING 정보
module.exports = async (req, res) => {
  const id = req.params.id;

  // 존재하는 게시글인지 확인
  const existPost = posts.filter((obj) => Number(obj.id) === Number(id))[0];

  if (!existPost) {
    return res
      .status(statusCode.NOT_FOUND)
      .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
  }

  // 성공
  res
    .status(statusCode.OK)
    .send(
      util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, existPost)
    );
};
