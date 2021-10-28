const Joi = require('joi');

module.exports = {
  // 회원가입 Schema
  signUpSchema: Joi.object({
    userId: Joi.string()
      .required()
      .min(5)
      .max(20)
      .pattern(/^[a-z0-9_-]{5,20}$/),
    nickname: Joi.string().required(),
    pw: Joi.string()
      .required()
      .min(8)
      .max(16)
      .pattern(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-z0-9!@#$%^&*?-]{8,16}$/),
    confirmPw: Joi.ref('pw'),
    ageGroup: Joi.number().required(),
  }),
  // 찬반투표 게시물 Schema
  eitherSchema: Joi.object({
    title: Joi.string().required(),
    contentA: Joi.string().required(),
    contentB: Joi.string().required(),
    date: Joi.string().required(),
  }),
  // 객관식 게시물 Schema
  multiSchema: Joi.object({
    title: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    contentA: Joi.string().required(),
    contentB: Joi.string().required(),
    contentC: Joi.string().allow(null),
    contentD: Joi.string().allow(null),
    contentE: Joi.string().allow(null),
    date: Joi.string().required(),
  }),
  // 댓글 작성 Schema
  postCommentSchema: Joi.object({
    comment: Joi.string().required().min(1),
    date: Joi.string().required(),
  }),
  // 댓글 수정 Schema
  editCommentSchema: Joi.object({
    comment: Joi.string().required(),
    editedDate: Joi.string().required(),
  }),
  // 객관식 게시물 수정 Schema
  editMultiSchema: Joi.object({
    title: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    contentA: Joi.string().required(),
    contentB: Joi.string().required(),
    contentC: Joi.string().allow(null),
    contentD: Joi.string().allow(null),
    contentE: Joi.string().allow(null),
    editedDate: Joi.string().allow(null),
  }),
  // 찬반투표 게시물 수정 schema
  editEitherSchema: Joi.object({
    title: Joi.string().required().min(1),
    contentA: Joi.string().required().min(1),
    contentB: Joi.string().required().min(1),
    editedDate: Joi.string().required(),
  }),
};
