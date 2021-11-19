"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("../controllers/user");
const router = express.Router();
router.post('/signup', user_1.default.signUp); // 회원가입
router.post('/signup/id', user_1.default.CheckDuplicatedId); // 중복 아이디 확인
router.post('/signup/nick', user_1.default.CheckDuplicatedNick); // 중복 닉네임 확인
router.post('/login', user_1.default.login); // 로그인
router.get('/login', user_1.default.checkLoginStatus); // 로그인 상태 확인
router.get('/logout', user_1.default.logout); // 로그아웃
exports.default = router;
//# sourceMappingURL=user.js.map