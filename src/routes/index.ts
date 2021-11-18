import * as express from 'express';
const router = express.Router();
import userRouter from './user';
import profileRouter from './profile';

router.use('/users', userRouter);
router.use('/profile', profileRouter);

export default router;
