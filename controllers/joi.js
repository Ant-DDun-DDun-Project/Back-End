const Joi = require('joi');

module.exports = {
  Joi,
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
      .pattern(/^(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$ %^&-]).{8,16}$/),
    confirmPw: Joi.ref('pw'),
    ageGroup: Joi.number().required(),
  }),
};
