const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  CheckDuplicatedId,
  CheckDuplicatedNick,
  logout,
} = require('../controllers/user');

router.post('/signup', signup); // 회원가입
router.post('/signup/id', CheckDuplicatedId); //아이디 중복체크
router.post('/signup/nick', CheckDuplicatedNick); //닉네임 중복체크
router.post('/login', login); // 로그인
router.get('/logout', logout); // 로그아웃

module.exports = router;
