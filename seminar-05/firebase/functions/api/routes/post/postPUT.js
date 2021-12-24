const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { postDB } = require('../../../db');

module.exports = async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  if (!postId || !title) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

  if (!req.user) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NEED_LOGIN));

  let client;

  try {
    client = await db.connect(req);
    const targetPost = await postDB.getPostById(client, postId);
    // 포스트 없음
    if (!targetPost) return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    // 작성자가 아님
    if (targetPost.userId !== Number(req.user.id)) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.MISS_MATCH_POST_USER));

    const updatedPost = await postDB.updatePost(client, title, content, postId, Number(req.user.id));
    if (!updatedPost) return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.POST_UPDATE_SUCCESS, updatedPost));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
