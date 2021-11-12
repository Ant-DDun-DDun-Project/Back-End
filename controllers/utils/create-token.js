const jwt = require('jsonwebtoken');

module.exports = {
  //토큰 생성
  createToken(id) {
    //user의 id값(로그인 시 필요한 아이디)을 인자로 받음
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '72h' }); //유효시간이 72시간인 jwt 생성
  },
};
