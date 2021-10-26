const MultiPost = require('../models/multi');
const { multiSchema } = require('./joi');

// 게시글 작성에 대한 기능
exports.postMulti = async (req, res, next) => {
  try {
    const {
      title, description, contentA, contentB,
      contentC, contentD, contentE, date,
    } = await multiSchema.validateAsync(req.body);   // Joi Schema 검증 절차
    const user = res.locals.user;   // 로그인한 유저는 user 아이디를 갖는다.

    // 객관식 게시물 DB 저장
    await MultiPost.create({
      user, title, description, contentA, contentB,
      contentC, contentD, contentE, date
    });
    res.status(200).json({ success: true });  // 게시글 작성 성공시 { success: true } 전송
  } catch (err) {
    console.error(err);
    next(err);
  }
};