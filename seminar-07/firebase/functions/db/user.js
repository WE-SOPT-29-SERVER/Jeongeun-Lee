// user 테이블과 상호작용하는 파일
// 

const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

// 첫 번째 쿼리
const getAllUsers = async (client) => {
  // 클라이언트 객체를 가져옴
  // user는 postgres에서 예약된 이름이라서 "user"로 쓰는 것임
  // 쿼리 실행 결과가 rows에 담김'
  // 원래 data.rows로 해야 하는데 구조분해할당 한것임.
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE is_deleted = FALSE
    `,
  );

  // return rows; // 이렇게 하면 snake case로 리턴됨
  
  // recursive하게 camel 케이스로 바뀜
  // 즉, nested된 객체도 바뀜
  // 모든 키가 camel 케이스로 바뀜
  return convertSnakeToCamel.keysToCamel(rows);
};

const getUserById = async (client, userId) => {
  // js자료형과 postgres 자료형이 다름
  // 따라서 ''을 추가하는 등의 설정을 해야 함
  // `
  // SELECT * FROM "user" u
  // WHERE id = '${userId}'
  //   AND is_deleted = FALSE
  // `
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE id = $1
      AND is_deleted = FALSE
    `,
    // client.query()의 두 번째 파라미터에는, 쿼리문에 집어넣고 싶은 변수들의 배열을 적습니다.
    // $1에는 배열의 첫번째 변수가, $2에는 배열의 두 번째 변수... 이런 식으로 쿼리문에 변수가 들어가게 됩니다!
    [userId],
  );
  // 위의 getAllUsers와는 달리, 이번에는 유저 하나만 가져오고 싶기 때문에 rows[0]만 리턴해 줍니다.
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getUserByIdFirebase = async (client, idFirebase) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE id_firebase = $1
      AND is_deleted = FALSE
    `,
    [idFirebase],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getUserByEmail = async (client, email) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE email = $1
      AND is_deleted = FALSE
    `,
    [email],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

// username만 있으면 phone이 undefined가 되어 정보가 삭제될 수 있다.
const updateUser = async (client, username, phone, userId) => {
  // 원래 객체를 먼저 불러옴
  const { rows: existingRows } = await client.query(
    `
    SELECT * FROM "user"
    WHERE id = $1
       AND is_deleted = FALSE
    `,
    [userId],
  );
  // 원래 객체가 없는 경우
  if (existingRows.length === 0) return false;

  // 기존 정보와 새로운 정보 합치기
  // 왼쪽에 있는 키가 오른쪽에 또 있으면 값을 바꿈
  // 여러개 연결 가능
  // nested 객체도 가능
  const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), { username, phone });

  const { rows } = await client.query(
    `
    UPDATE "user" u
    SET username = $1, phone = $2, updated_at = now()
    WHERE id = $3
    RETURNING * 
    `,
    [data.username, data.phone, userId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

// delete 관련 작업할 때 where 잘 확인하기
// returning을 해줘야 updated된 결과를 볼 수 있다.
const deleteUser = async (client, userId) => {
  const { rows } = await client.query(
    `
    UPDATE "user" u
    SET is_deleted = TRUE, updated_at = now()
    WHERE id = $1
    RETURNING *
    `,
    [userId],
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const addUser = async (client, email, username, phone, idFirebase) => {
  const { rows } = await client.query(
    `
    INSERT INTO "user"
    (email, username, phone, id_firebase)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `,

    [email, username, phone, idFirebase],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getAllUsers, getUserById, getUserByIdFirebase, getUserByEmail, updateUser, deleteUser, addUser };