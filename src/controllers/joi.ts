import * as Joi from 'joi';

class joiValidation {
  public signUpSchema = Joi.object({
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
  });
// 로그인 Schema
  public loginSchema = Joi.object({
    userId: Joi.string().required(),
    pw: Joi.string().required(),
  });
  // 찬반투표 게시물 Schema
  public eitherSchema = Joi.object({
    title: Joi.string().required(),
    contentA: Joi.string().required(),
    contentB: Joi.string().required(),
    date: Joi.string().required(),
  });
  // 객관식 게시물 Schema
  public multiSchema = Joi.object({
    title: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    contentA: Joi.string().required(),
    contentB: Joi.string().required(),
    contentC: Joi.string().allow(null),
    contentD: Joi.string().allow(null),
    contentE: Joi.string().allow(null),
    date: Joi.string().required(),
  });
  // 댓글 작성 Schema
  public postCommentSchema = Joi.object({
    comment: Joi.string().required().min(1),
    date: Joi.string().required(),
  });
  // 댓글 수정 Schema
  public editCommentSchema = Joi.object({
    comment: Joi.string().required(),
    editedDate: Joi.string().required(),
  });
  // 객관식 게시물 수정 Schema
  public editMultiSchema = Joi.object({
    title: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    contentA: Joi.string().required(),
    contentB: Joi.string().required(),
    contentC: Joi.string().allow(null),
    contentD: Joi.string().allow(null),
    contentE: Joi.string().allow(null),
    editedDate: Joi.string().allow(null),
  });
  // 찬반투표 게시물 수정 Schema
  public editEitherSchema = Joi.object({
    title: Joi.string().required().min(1),
    contentA: Joi.string().required().min(1),
    contentB: Joi.string().required().min(1),
    editedDate: Joi.string().required(),
  });
  // 아이디 중복 체크 Schema
  public duplicatedIdSchema = Joi.object({
    userId: Joi.string().required().min(1),
  });
  // 닉네임 중복 체크 Schema
  public duplicatedNickSchema = Joi.object({
    nickname: Joi.string().required().min(1),
  });
  // 찬반 투표하기 Schema
  public voteEitherSchema = Joi.object({
    vote: Joi.string().required(),
  });
  // 객관식 투표 Schema
  public voteMultiSchema = Joi.object({
    select: Joi.string().required(),
  });
  // 닉네임 변경 Schema
  public editNickSchema = Joi.object({
    nickname: Joi.string().required().min(2).max(7),
  });
}

export default new joiValidation();