module.exports = {
  //비밀번호 재확인과 일치하는지 검증
  validatePassword(pw, confirmPw) {
    return pw === confirmPw;
  },
};
