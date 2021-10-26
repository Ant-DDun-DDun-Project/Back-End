const eitherPost = require('../models/either');
const { eitherSchema } = require('./joi');

// 게시글 작성에 대한 기능
exports.postEither = async (req, res, next) => {
  try {
    const { title, contentA, contentB, date } = await eitherSchema.validateAsync(req.body);
    const user = res.locals.user;
    await eitherPost.create({
      user,
      title,
      contentA,
      contentB,
      date,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('양자택일 작성 시 에러발생', err);
    next(err);
  }
};
