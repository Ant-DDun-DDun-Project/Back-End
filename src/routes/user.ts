import * as express from 'express';
import userControllers from '../controllers/user';
const router = express.Router();


router.post('/signup', userControllers.signUp); // 회원가입
router.post('login', userControllers.login); // 로그인
router.get('/login', userControllers.checkLoginStatus); // 로그인 상태 확인

export default router;