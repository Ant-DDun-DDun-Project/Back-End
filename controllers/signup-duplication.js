const User = require('../models/users');

// 아이디 중복 체크에 대한 함수
exports.CheckDuplicatedId = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (await User.findOne({ where: { userId } })) {  // 이미 DB에 존재하는 아이디일 경우
      res.status(400).json({ success: false });
    } else {  // DB에 존재하지 않는 아이디일 경우
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// 닉네임 중복 체크에 대한 함수
exports.CheckDuplicatedNick = async (req, res, next) => {
  try {
    const { nickname } = req.body;
    if (await User.findOne({ where: { nickname } })) {  // 이미 DB에 존재하는 닉네임일 경우
      res.status(400).json({ success: false });
    } else {  // DB에 존재하지 않는 닉네임일 경우
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};