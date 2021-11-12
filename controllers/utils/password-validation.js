module.exports = {
  //비밀번호 재확인과 일치하는지 검증
  validatePassword(pw, confirmPw) {
    return pw === confirmPw; //일치하면 true, 일치하지 않으면 false를 반환한다.
  },
};
