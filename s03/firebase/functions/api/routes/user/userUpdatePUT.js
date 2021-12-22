const express = require("express");
const router = express.Router();
// response 데이터 형식 지정
const util = require("./../../../lib/util");
const responseMessage = require("./../../../constants/responseMessage");
const statusCode = require("./../../../constants/statusCode");

const users = require("./../../../dbMockup/user");

// URI: localhost:3000/user/update/:id

module.exports = async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;

  // request data 확인 - 없다면 Null Value 반환
  if (!id || !newName) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  // 존재하는 아이디인지 확인 - 없다면 No User 반환
  const existUser = users.filter((obj) => Number(obj.id) === Number(id))[0];

  if (!existUser) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  if (!existUser) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  const updatedUser = { ...existUser, name: newName };

  // 성공 - login success와 함께 비밀번호를 제외한 유저 정보 반환
  res
    .status(statusCode.OK)
    .send(
      util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, updatedUser)
    );
};
