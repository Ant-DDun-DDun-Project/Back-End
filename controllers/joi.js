const Joi = require('joi');

module.exports = {
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
  postCommentSchema: Joi.object({
    comment: Joi.string().required().min(1),
    date: Joi.string().required(),
  }),
};
