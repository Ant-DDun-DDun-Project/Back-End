"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
//비밀번호 재확인과 일치하는지 검증
function validatePassword(pw, confirmPw) {
    return pw === confirmPw; //일치하면 true, 일치하지 않으면 false를 반환한다.
}
exports.validatePassword = validatePassword;
//# sourceMappingURL=password-validation.js.map