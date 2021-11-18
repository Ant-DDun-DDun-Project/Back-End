import * as express from 'express';
const router = express.Router();
import userRouter from './user';

router.use('/users', userRouter);

export default router;
