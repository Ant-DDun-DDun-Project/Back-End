import * as express from 'express';
import userControllers from '../controllers/user';
const router = express.Router();

router.post('/signup', userControllers.signUp);
router.get('/login', userControllers.checkLoginStatus); // 로그인 상태 확인

export default router;
