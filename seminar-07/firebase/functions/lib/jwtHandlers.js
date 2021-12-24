const functions = require('firebase-functions');
const jwt = require('jsonwebtoken');
const { TOKEN_INVALID, TOKEN_EXPIRED } = require('../constants/jwt');
// salt 역할
// 시크릿 키 가져옴
const secretKey = process.env.JWT_SECRET;
// 유저 정보를 토큰화하는 옵션
const options = {
  algorithm: 'HS256',
  expiresIn: '10s', // 프로덕션은 기간을 더 짧게 함
  issuer: 'wesopt', // 누가 서명
};

// jwt 토큰 만들기
// user: 새로 생성하거나 가져온 유저 객체
// 더 담고 싶으면 더 담아도 됨
const sign = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name || null,
    idFirebase: user.idFirebase,  // 먼저 firebase에서 유저를 생성하고 토큰 생성
  };

  // 토큰 만들기
  const result = {
    accesstoken: jwt.sign(payload, secretKey, options),
    // refreshToken: jwt.sign(payload, secretKey, refreshOptions),
  };
  return result;
};

// 들어오는 jwt 토큰이 맞는지 확인
const verify = (token) => {
  let decoded;
  // 비밀번호를 우리가 만든 토큰이 맞는지 확인
  // 통시에 다시 payload 형태로 펼쳐줌
  try {
    decoded = jwt.verify(token, secretKey);
  } catch (err) {
    // jwt 모듈이 반환하는 error message
    // 에러가 나면 -1 -2 이런 값을 반환한다고 정의해줌
    if (err.message === 'jwt expired') {
      console.log('expired token');
      return TOKEN_EXPIRED;
    } else if (err.message === 'invalid token') {
      console.log('invalid token');
      console.log(TOKEN_INVALID);
      return TOKEN_INVALID;
    } else {
      console.log('invalid token');
      return TOKEN_INVALID;
    }
  }
  return decoded;
};

module.exports = {
  sign,
  verify,
};
