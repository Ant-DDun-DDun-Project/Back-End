import * as express from 'express';
const router = express.Router();
import userRouter from './user';
import profileRouter from './profile';
import mainRouter from './main';
import searchRouter from './search';
import eitherRouter from './either';
import multiRouter from './multi';

router.use('/', mainRouter);
router.use('/users', userRouter);
router.use('/profiles', profileRouter);
router.use('/search', searchRouter);
router.use('/posts/multi', multiRouter);
router.use('/posts/either', eitherRouter);

export default router;
