import * as express from 'express';
const router = express.Router();
import userRouter from './user';

router.get('/users');

export default router;
