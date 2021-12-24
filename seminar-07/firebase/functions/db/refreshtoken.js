const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

// const AddrefreshToken = async (client, userId, refreshtoken) => {
//   const { rows } = await client.query(
//     `
//         INSERT INTO refreshtoken
//         (user_id, token)
//         VALUES
//         ($1, $2)
//         RETURNING *
//         `,

//     [userId, refreshtoken],
//   );
//   return convertSnakeToCamel.keysToCamel(rows[0]);
// };

const updateRefreshToken = async (client, userId, refreshtoken) => {
  // 원래 객체를 먼저 불러옴
  const { rows: existingRows } = await client.query(
    `
      SELECT * FROM refreshtoken
      WHERE user_id = $1
        AND is_deleted = FALSE
      `,
    [userId],
  );

  // 원래 객체가 없는 경우
  if (existingRows.length === 0) {
    const { rows } = await client.query(
      `
            INSERT INTO refreshtoken
            (user_id, token)
            VALUES
            ($1, $2)
            RETURNING *
            `,

      [userId, refreshtoken],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
  }

  // 원래 객체가 있는 경우
  const { rows } = await client.query(
    `
      UPDATE refreshtoken
      SET token = $1, updated_at = now()
      WHERE user_id = $2
      RETURNING * 
      `,
    [refreshtoken, userId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getRefreshToken = async (client, userId) => {
  const { rows } = await client.query(
    `
      SELECT * FROM refreshtoken
      WHERE user_id = $1
        AND is_deleted = FALSE
      `,
    [userId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { updateRefreshToken, getRefreshToken };
