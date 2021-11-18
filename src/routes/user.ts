import * as express from 'express';
const router = express.Router();
import userControllers from '../controllers/user';

router.get('/login', userControllers.checkLoginStatus); // 로그인 상태 확인

export default router;
