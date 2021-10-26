const MultiPost = require('../models/multi');
const Joi = require('joi');

async function MultiValidation(req) {
  const MultiSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    contentA: Joi.string().required(),
    contentB: Joi.string().required(),
    contentC: Joi.string(),
    contentD: Joi.string(),
    contentF: Joi.string(),
    contentE: Joi.string(),
    date: Joi.string().required(),
  });
  const {
    title, description, contentA, contentB,
    contentC, contentD, contentE, date,
  } = await MultiSchema.validateAsync(req.body);
  return {
    title, description, contentA, contentB,
    contentC, contentD, contentE, date,
  };
}

// 게시글 작성에 대한
exports.postMulti = async (req, res, next) => {
  const {
    title, description, contentA, contentB,
    contentC, contentD, contentE, date,
  } = await MultiValidation(req);   // Joi Schema 검증 절차
  try {
    const user = res.locals.user;   // 로그인한 유저는 user 아이디를 갖는다.
    // 객관식 게시물 DB 저장
    await MultiPost.create({
      user, title, description, contentA, contentB,
      contentC, contentD, contentE, date
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
};