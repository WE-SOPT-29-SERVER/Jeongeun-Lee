const _ = require('lodash');
const convertSnakeToCamel = require('./../lib/convertSnakeToCamel');

// 첫 번째 쿼리
const getAllPosts = async (client) => {
  // 클라이언트 객체를 가져옴
  // post는 postgres에서 예약된 이름이라서 "post"로 쓰는 것임
  // 쿼리 실행 결과가 rows에 담김'
  // 원래 data.rows로 해야 하는데 구조분해할당 한것임.
  const { rows } = await client.query(
    `
    SELECT * FROM "post" p
    WHERE is_deleted = FALSE
    `,
  );

  // return rows; // 이렇게 하면 snake case로 리턴됨
  
  // recursive하게 camel 케이스로 바뀜
  // 즉, nested된 객체도 바뀜
  // 모든 키가 camel 케이스로 바뀜
  return convertSnakeToCamel.keysToCamel(rows);
};

const getPostById = async (client, postId) => {
  // js자료형과 postgres 자료형이 다름
  // 따라서 ''을 추가하는 등의 설정을 해야 함
  // `
  // SELECT * FROM "post" u
  // WHERE id = '${postId}'
  //   AND is_deleted = FALSE
  // `
  const { rows } = await client.query(
    `
    SELECT * FROM "post" u
    WHERE id = $1
      AND is_deleted = FALSE
    `,
    // client.query()의 두 번째 파라미터에는, 쿼리문에 집어넣고 싶은 변수들의 배열을 적습니다.
    // $1에는 배열의 첫번째 변수가, $2에는 배열의 두 번째 변수... 이런 식으로 쿼리문에 변수가 들어가게 됩니다!
    [postId],
  );
  // 위의 getAllPosts와는 달리, 이번에는 유저 하나만 가져오고 싶기 때문에 rows[0]만 리턴해 줍니다.
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

// title만 있으면 content가 undefined가 되어 정보가 삭제될 수 있다.
const updatePost = async (client, title, content, postId, userId) => {
  // 원래 객체를 먼저 불러옴
  const { rows: existingRows } = await client.query(
    `
    SELECT * FROM "post"
    WHERE id = $1
    AND user_id = $2
    AND is_deleted = FALSE
    `,
    [postId, userId],
  );
  // 원래 객체가 없는 경우
  if (existingRows.length === 0) return false;


  // 기존 정보와 새로운 정보 합치기
  // 왼쪽에 있는 키가 오른쪽에 또 있으면 값을 바꿈
  // 여러개 연결 가능
  // nested 객체도 가능
  const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), { title, content });

  const { rows } = await client.query(
    `
    UPDATE "post" u
    SET title = $1, content = $2, updated_at = now()
    WHERE id = $3
    RETURNING * 
    `,
    [data.title, data.content, postId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

// delete 관련 작업할 때 where 잘 확인하기
// returning을 해줘야 updated된 결과를 볼 수 있다.
const deletePost = async (client, postId, userId) => {
  const { rows } = await client.query(
    `
    UPDATE "post" u
    SET is_deleted = TRUE, updated_at = now()
    WHERE id = $1
    AND user_id = $2
    RETURNING *
    `,
    [postId, userId],
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const addPost = async (client, title, content,userId,  imageUrls) => {
  const { rows } = await client.query(
    `
    INSERT INTO post
    (user_id, title, content, image_urls)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `,
    [userId, title, content, imageUrls],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getAllPosts, getPostById, updatePost, deletePost, addPost };
