const MultiPost = require('../models/multi');
const Joi = require('joi');

// req.body 에 대한 Joi 검증 기능
async function MultiValidation(req) {
  const MultiSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    contentA: Joi.string().required(),
    contentB: Joi.string().required(),
    contentC: Joi.string().allow(null),
    contentD: Joi.string().allow(null),
    contentE: Joi.string().allow(null),
    date: Joi.string().required(),
  });   // Joi Schema 정의
  const {
    title, description, contentA, contentB,
    contentC, contentD, contentE, date,
  } = await MultiSchema.validateAsync(req.body);  // Joi 검증
  return {
    title, description, contentA, contentB,
    contentC, contentD, contentE, date,
  };
}

// 게시글 작성에 대한 기능
exports.postMulti = async (req, res, next) => {
  try {
    const {
      title, description, contentA, contentB,
      contentC, contentD, contentE, date,
    } = await MultiValidation(req);   // Joi Schema 검증 절차
    const user = res.locals.user;   // 로그인한 유저는 user 아이디를 갖는다.
    // const user = 'jeangho293';   // Todo --> 사용자 인증 미들웨어를 지나온다면 제거해야하는 부분
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