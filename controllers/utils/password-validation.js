module.exports = {
  validatePassword(pw, confirmPw) {
    if (pw !== confirmPw) {
      return false;
    }
    return true;
  },
};
