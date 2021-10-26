module.exports = {
  passwordValidation(userId, password, passwordCheck) {
    if (password !== passwordCheck) {
      // console.log('패스워드 일치시켜주세요');
      return false;
    } else if (password.search(userId) !== -1) {
      // console.log('아이디와 중복되는 패스워드 설정하지 말아주세요');
      return false;
    }
    return true;
  },
};
