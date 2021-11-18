import * as express from 'express';
const router = express.Router();
import userControllers from '../controllers/user'

router.post('login', userControllers.login); // 로그인

export default router;