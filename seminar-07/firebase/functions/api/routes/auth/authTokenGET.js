const functions = require('firebase-functions');
const jwtHandlers = require('../../../lib/jwtHandlers');
const refreshTokenHandlers = require('../../../lib/refreshTokenHandlers');

const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { userDB } = require('../../../db');
const { refreshtokenDB } = require('../../../db');
const { TOKEN_INVALID, TOKEN_EXPIRED } = require('../../../constants/jwt');

module.exports = async (req, res) => {
  // request headers에 accesstoken, refreshtoken라는 이름으로 값을 가져옵니다.
  // const { accesstoken, refreshtoken } = req.headers;
  const accesstoken = req.headers.accesstoken;
  const refreshtoken = req.headers.refreshtoken;
  // token이 없을 시의 에러 처리입니다.
  if (!accesstoken || !refreshtoken) res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.TOKEN_EMPTY));

  // console.log(refreshtoken);

  const act = accesstoken;
  let client;
  try {
    client = await db.connect(req);

    // jwt를 해독하고 인증 절차를 거칩니다.
    const decodedToken = jwtHandlers.verify(act);
    const decodedRefreshToken = refreshTokenHandlers.verify(refreshtoken);
    console.log('해독');
    console.log(decodedToken);
    console.log(decodedRefreshToken);

    // 토큰이 만료되었거나 잘못되었을 시의 에러 처리입니다.
    console.log("42");
    if (decodedToken === TOKEN_INVALID) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID));

    console.log("45");
    if (decodedRefreshToken === TOKEN_EXPIRED) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.REFRESH_TOKEN_EXPIRED));
    console.log("47");
    if (decodedRefreshToken === TOKEN_INVALID) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.REFRESH_TOKEN_INVALID));

    // 해독된 jwt에 담긴 id 값이 우리가 DB에서 찾고자 하는 user의 id입니다.
    const userId = decodedRefreshToken.id;

    // 유저id가 없을 시의 에러 처리입니다.
    // 토큰 받고 탈퇴했을때에 대한 대비
    console.log("55");
    if (!userId) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));

    console.log('잘못된 refresh 토큰 (DB에 있는 것과 다름)');
    // 잘못된 refresh 토큰 (DB에 있는 것과 다름)
    const oldRefreshToken = await refreshtokenDB.getRefreshToken(client, userId);
    if (oldRefreshToken.token !== refreshtoken) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.REFRESH_TOKEN_INVALID));

    // 위의 id 값으로 유저를 조회합니다.
    const user = await userDB.getUserById(client, userId);

    // 유저가 없을 시의 에러 처리입니다.
    console.log("71");
    if (!user) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.NO_USER));

    // 새로운 토큰 발급
    const { accesstoken } = jwtHandlers.sign(user);

    // 토큰 보내주기
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GENERATE_NEW_TOKEN, { user, accesstoken }));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
