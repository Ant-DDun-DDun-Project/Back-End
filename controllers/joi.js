const Joi = require('joi');

module.exports = {
  // 회원가입 Schema
  signUpSchema: Joi.object({
    userId: Joi.string()
      .required()
      .min(5)
      .max(20)
      .pattern(/^[a-z0-9_-]{5,20}$/),
    nickname: Joi.string().required().min(2).max(7),
    pw: Joi.string()
      .required()
      .min(8)
      .max(16)
      .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9!@#$%^&*?-]{8,16}$/),
    confirmPw: Joi.ref('pw'),
    ageGroup: Joi.number().required(),
  }),
  // 로그인 Schema
  loginSchema: Joi.object({
    userId: Joi.string().required(),
    pw: Joi.string().required(),
  }),
  // 찬반투표 게시물 Schema
  eitherSchema: Joi.object({
    title: Joi.string().required().max(30),
    contentA: Joi.string().required().max(30),
    contentB: Joi.string().required().max(30),
    date: Joi.string().required(),
  }),
  // 객관식 게시물 Schema
  multiSchema: Joi.object({
    title: Joi.string().required().max(30),
    description: Joi.string().required().min(1),
    contentA: Joi.string().required().max(30),
    contentB: Joi.string().required().max(30),
    contentC: Joi.string().allow(null).max(30),
    contentD: Joi.string().allow(null).max(30),
    contentE: Joi.string().allow(null).max(30),
    date: Joi.string().required(),
  }),
  // 댓글 작성 Schema
  postCommentSchema: Joi.object({
    comment: Joi.string().required().min(1).max(1000),
    date: Joi.string().required(),
  }),
  // 댓글 수정 Schema
  editCommentSchema: Joi.object({
    comment: Joi.string().required().max(1000),
    editedDate: Joi.string().required(),
  }),
  // 객관식 게시물 수정 Schema
  editMultiSchema: Joi.object({
    title: Joi.string().required().min(1).max(30),
    description: Joi.string().required().min(1),
    contentA: Joi.string().required().max(30),
    contentB: Joi.string().required().max(30),
    contentC: Joi.string().allow(null).max(30),
    contentD: Joi.string().allow(null).max(30),
    contentE: Joi.string().allow(null).max(30),
    editedDate: Joi.string().allow(null),
  }),
  // 찬반투표 게시물 수정 Schema
  editEitherSchema: Joi.object({
    title: Joi.string().required().min(1).max(30),
    contentA: Joi.string().required().min(1).max(30),
    contentB: Joi.string().required().min(1).max(30),
    editedDate: Joi.string().required(),
  }),
  // 아이디 중복 체크 Schema
  duplicatedIdSchema: Joi.object({
    userId: Joi.string().required().min(1),
  }),
  // 닉네임 중복 체크 Schema
  duplicatedNickSchema: Joi.object({
    nickname: Joi.string().required().min(1),
  }),
  // 찬반 투표하기 Schema
  voteEitherSchema: Joi.object({
    vote: Joi.string().required(),
  }),
  // 객관식 투표 Schema
  voteMultiSchema: Joi.object({
    select: Joi.string().required(),
  }),
  // 닉네임 변경 Schema
  editNickSchema: Joi.object({
    nickname: Joi.string().required().min(2).max(7),
  }),
};
