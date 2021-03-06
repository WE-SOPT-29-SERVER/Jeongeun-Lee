const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const { signInWithEmailAndPassword } = require('firebase/auth');
const db = require('../../../db/db');
const { userDB } = require('../../../db');
const { refreshtokenDB } = require('../../../db');

const { firebaseAuth } = require('../../../config/firebaseClient');

const jwtHandlers = require('../../../lib/jwtHandlers');
const refreshTokenHandlers = require('../../../lib/refreshTokenHandlers');
module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  let client;

  try {
    client = await db.connect(req);

    // ~~~ 1. Firebase Authentication을 통해 유저 인증
    const userFirebase = await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((user) => user)
      .catch((e) => {
        console.log(e);
        return { err: true, error: e };
      });

    // 에러 검증
    if (userFirebase.err) {
      if (userFirebase.error.code === 'auth/user-not-found') {
        return res.status(statusCode.NOT_FOUND).json(util.fail(statusCode.NOT_FOUND, responseMessage.NO_USER));
      } else if (userFirebase.error.code === 'auth/invalid-email') {
        return res.status(statusCode.NOT_FOUND).json(util.fail(statusCode.NOT_FOUND, responseMessage.INVALID_EMAIL));
      } else if (userFirebase.error.code === 'auth/wrong-password') {
        return res.status(statusCode.NOT_FOUND).json(util.fail(statusCode.NOT_FOUND, responseMessage.MISS_MATCH_PW));
      } else {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
      }
    }

    const {
      user: { uid: idFirebase },
    } = userFirebase;

    // ~~~ 2. RDS DB에 저장된 user 조회
    const user = await userDB.getUserByIdFirebase(client, idFirebase);

    // ~~~ 3. JWT 발급
    const { accesstoken } = jwtHandlers.sign(user);

    // 3.5 refresh token 발급
    const {refreshtoken} = refreshTokenHandlers.sign(user);

    // refresh token을 DB에 추가
    await refreshtokenDB.updateRefreshToken(client, user.id, refreshtoken);


    // ~~~ 4. user + JWT + refresh token를 response로 전송
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, { user, accesstoken, refreshtoken }));
  } catch (error) {
    console.log(error);
    functions.logger.error(`[EMAIL SIGNUP ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] email: ${email} ${error}`);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
