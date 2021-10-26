const User = require('../models/users');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { createToken } = require('./utils/create-token.js');

exports.login = async (req, res, next) => {
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
    res.status(200).json({
      success: true,
      token,
    });
  }
};
