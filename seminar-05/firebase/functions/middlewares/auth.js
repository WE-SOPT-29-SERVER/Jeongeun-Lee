const functions = require('firebase-functions');
const jwtHandlers = require('../lib/jwtHandlers');
const db = require('../db/db');
const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { userDB } = require('../db');
const { TOKEN_EXPIRED, TOKEN_INVALID } = require('./../db/jwt');

const checkUser = async (req, res, next) => {
  let client;
  try {
    client = await db.connect(req);

    let user;
    // 클라이언트가 보낸 정보 받기
    const authHeader = String(req.headers.authorization || '');

    // 정보 없는지 체크
    if (!authHeader) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_AUTH_HEADER));
    const token = authHeader.substring(7, authHeader.length);
    if (!token) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.TOKEN_EMPTY));

    // 해독한 토큰
    // 시크릿키 사용
    const decodedToken = jwtHandlers.verify(token);
    // 오래되거나 잘못된 토큰
    if (decodedToken === TOKEN_EXPIRED) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_EXPIRED));
    if (decodedToken === TOKEN_INVALID) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID));

    // 유저 아이디
    const userId = decodedToken.id;
    console.log(decodedToken);
    if (!userId) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID));

    // db에서 유저찾기
    user = await userDB.getUserById(client, userId);

    if (!user) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.NO_USER));

    // req.user에 담음 (원래는 undefined)
    // 다음 요청에서 쓸 수 있음 (next해서 사용)
    req.user = user;
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }

  next();
};

module.exports = { checkUser };
