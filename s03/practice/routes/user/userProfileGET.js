const express = require("express");
const router = express.Router();
// response 데이터 형식 지정
const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

const users = require("./../../dbMockup/user");

// URI: localhost:3000/user/profile/:id

// RESPONSE DATA: 비밀번호를 제외한 User 정보
module.exports = async (req, res) => {
  const id = req.params.id;

  // 존재하는 아이디인지 확인 - 없다면 No User 반환
  const existUser = users.filter((obj) => Number(obj.id) === Number(id))[0];

  if (!existUser) {
    return res
      .status(statusCode.NOT_FOUND)
      .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_USER));
  }

  // 성공 - login success와 함께 비밀번호를 제외한 유저 정보 반환
  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
      id: existUser.id,
      name: existUser.name,
      email: existUser.email,
    })
  );
};
