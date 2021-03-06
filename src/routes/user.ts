import * as express from 'express';
import userControllers from '../controllers/user';

const router = express.Router();

router.post('/signup', userControllers.signUp); // 회원가입
router.post('/signup/id', userControllers.CheckDuplicatedId); // 중복 아이디 확인
router.post('/signup/nick', userControllers.CheckDuplicatedNick); // 중복 닉네임 확인
router.post('/login', userControllers.login); // 로그인

export default router;
