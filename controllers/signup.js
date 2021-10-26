const { signUpSchema } = require('./joi');
const User = require('../models/users');
const salt = process.env.SALT;
const bcrypt = require('bcrypt');
const { passwordValidation } = require('./utils/passwordValidation.js');

exports.signup = async (req, res, next) => {
  const { userId, nickname, pw, confirmPw, ageGroup } =
    await signUpSchema.validateAsync(req.body);
  if (passwordValidation(pw, confirmPw)) {
    const encryptedPw = await bcrypt.hash(pw, salt);
    try {
      const userExist = await User.findOne({
        where: {
          userId,
        },
      });
      if (!userExist) {
        await User.create({
          userId,
          nickname,
          pw: encryptedPw,
          ageGroup,
        });
        return res.status(201).json({ success: true });
      } else {
        return res.status(400).json({
          success: false,
          msg: '중복된 닉네임입니다',
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
