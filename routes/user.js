const express = require('express');
const router = express.Router();
const { authForGuest } = require('../middlewares/auth');
const {
  signup,
  login,
  CheckDuplicatedId,
  CheckDuplicatedNick,
  logout,
  checkLoginStatus,
} = require('../controllers/user');

router.post('/signup/id', CheckDuplicatedId); //아이디 중복체크
router.post('/signup/nick', CheckDuplicatedNick); //닉네임 중복체크
router.post('/signup', signup); // 회원가입
router.post('/login', login); // 로그인
router.get('/logout', logout); // 로그아웃
router.get('/login', authForGuest, checkLoginStatus); // 로그인 상태 확인

module.exports = router;
