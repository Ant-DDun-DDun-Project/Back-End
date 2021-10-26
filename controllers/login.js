const User = require('../models/users');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { createToken } = require('./utils/create-token.js');
const { JsonWebTokenError } = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  try {
    const { userId, pw } = req.body;
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
      const token = createToken(userData.id);
      res.cookie('user', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 });
      res.status(200).json({
        success: true,
      });
    }
  } catch (err) {
    console.log('로그인 시 에러발생', err);
    next(err);
  }
};
