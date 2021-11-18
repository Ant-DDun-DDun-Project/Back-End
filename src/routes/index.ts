import * as express from 'express';
const router = express.Router();
import userRouter from './user';
import profileRouter from './profile';
import mainRouter from './main';
import searchRouter from './search';

router.use('/', mainRouter);
router.use('/users', userRouter);
router.use('/profile', profileRouter);
router.use('/search', searchRouter);

export default router;
