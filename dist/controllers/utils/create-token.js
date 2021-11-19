"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jwt = require("jsonwebtoken");
// 토큰 발급
function createToken(id) {
    //user의 id값(로그인 시 필요한 아이디)을 인자로 받음
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '72h' });
}
exports.createToken = createToken;
//# sourceMappingURL=create-token.js.map