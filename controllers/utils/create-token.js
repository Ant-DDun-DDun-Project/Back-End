const jwt = require('jsonwebtoken');

module.exports = {
  //토큰 생성
  createToken(id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn: '72h',
    });
  },
};
