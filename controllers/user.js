const { signUpSchema, loginSchema, duplicatedNickSchema, duplicatedIdSchema } = require('./joi');
const { User } = require('../models');
require('dotenv').config();
const salt = Number(process.env.SALT);
const bcrypt = require('bcrypt');
const { validatePassword } = require('./utils/password-validation.js');
const { createToken } = require('./utils/create-token.js');

module.exports = {
  //회원가입
  signup: async (req, res, next) => {
    try {
      const { userId, nickname, pw, confirmPw, ageGroup } = await signUpSchema.validateAsync(
        req.body
      );
      if (validatePassword(pw, confirmPw)) {
        const encryptedPw = await bcrypt.hash(pw, salt);
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
            msg: '중복된 아이디입니다.',
          });
        }
      } else {
        res.status(400).json({
          success: false,
          msg: '비밀번호를 확인해주세요.',
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //로그인
  login: async (req, res, next) => {
    try {
      const { userId, pw } = await loginSchema.validateAsync(req.body);
      const userData = await User.findOne({
        where: {
          userId,
        },
      });
      const pwCheck = bcrypt.compareSync(pw, userData.pw);
      if (!userData || !pwCheck) {
        res.status(400).json({
          success: false,
        });
      } else {
        const nickname = userData.nickname;
        const userId = userData.id;
        const token = createToken(userData.id);
        res.cookie('user', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 });
        res.status(200).json({
          success: true,
          nickname,
          userId,
        });
      }
    } catch (err) {
      console.log('로그인 시 에러발생', err);
      next(err);
    }
  },
  //아이디 중복체크
  CheckDuplicatedId: async (req, res, next) => {
    try {
      const { userId } = await duplicatedIdSchema.validateAsync(req.body);
      if (await User.findOne({ where: { userId } })) {
        // 이미 DB에 존재하는 아이디일 경우
        res.status(400).json({ success: false });
      } else {
        // DB에 존재하지 않는 아이디일 경우
        res.status(200).json({ success: true });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  // 닉네임 중복 체크에 대한 함수
  CheckDuplicatedNick: async (req, res, next) => {
    try {
      const { nickname } = await duplicatedNickSchema.validateAsync(req.body);
      if (await User.findOne({ where: { nickname } })) {
        // 이미 DB에 존재하는 닉네임일 경우
        res.status(400).json({ success: false });
      } else {
        // DB에 존재하지 않는 닉네임일 경우
        res.status(200).json({ success: true });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
