const express = require("express");
const router = express.Router();
// response 데이터 형식 지정
const util = require("../lib/util");
const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");

const users = require("./../dbMockup/user");

// /user/signup
router.post("/signup", (req, res) => {
  // ~~~ 방식1 ~~~
  // const myEmail = req.body.email
  // const password = req.body.password
  // const name = req.body.name

  // ~~~ 방식2 ~~~

  // destructuring assignment
  // 비구조화 할당
  // body 객체를 분해해서 다시 할당
  // body.키 를 간단히 할당
  const { email, name, password } = req.body;

  // 이름 짓는 방법- 내가 지은 이름을 : 뒤에 작성
  // const {email: myEmail, name, password} = req.body;

  // ~~~ 유효한 데이터인지 확인 ~~~
  // ~~~ 1. request body가 잘못됐을 때
  // truthy, falsy
  // 값이 없다면..

  // 예시
  // {email: ""} // 빈 문자열
  // {email: null} // null
  // {} // 키도 없음
  if (!email || !name || !password) {
    // return을 해야 함 (매우 중요!!)
    // return res.status(400).send({status: 400, message: "BAD REQUEST"})

    // util을 써서 통일할 수 있음
    return res
      .status(400)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  // ~~~ 2. 해당 email을 가진 유저가 이미 있을 때
  const alreadyUser = users.filter((obj) => obj.email === email).length > 0;

  if (alreadyUser) {
    // return res.status(400).send({status: 409, message: "ALREADY EMAIL"})
    return res
      .status(400)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
  }

  // 어떤 키에 어떤 데이터가 들어갈지 클라이언트와 합의해야함 : API 명세서
  // 서버는 서버 자체로 동일 형식을 받는 것이 좋다.

  // ~~ 새로운 유저 데이터 만들어주기 ~~
  // id는 보통 db에서 저절로 만들어줌
  const newUser = {
    id: users.length + 1,
    name, // key와 value 이름이 같으면 생략 가능
    password: password,
    email: email,
  };

  // res.status(200).send(newUser)
  res
    .status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.CREATED_USER, newUser));
});


// query: /user?age=30
// param: /user/4









// REQUEST BODY: email, password
// RESPONSE DATA: 비밀번호를 제외한 User 정보
router.post("/login", async (req, res) => {
  // request body에서 데이터 가져오기
  const { email, password } = req.body;
  
  
  // request data 확인 - 없다면 Null Value 반환
  if (!email || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }


  // 존재하는 유저인지 확인 - 없다면 No User 반환
  const loginUser = users.filter((obj) => obj.email === email)[0];
  if (!loginUser) {
    return res
      .status(statusCode.NOT_FOUND)
      .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_USER));
  }


  // 비밀번호 확인 - 틀렸다면 Missmatch password 반환
  if (loginUser.password !== password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(
        util.fail(
          statusCode.BAD_REQUEST, 
          responseMessage.MISS_MATCH_PW
          )
        );
  }

  const responseUser = {
    email: loginUser.email,
    name: loginUser.name,
    email: loginUser.email,
  };

  // 성공 - login success와 함께 비밀번호를 제외한 유저 정보 반환
  res
    .status(statusCode.OK)
    .send(
      util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, responseUser)
    );
});
router.get("/", (req, res) => {});
// param 받기
router.get("/:id", (req, res) => {});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;
