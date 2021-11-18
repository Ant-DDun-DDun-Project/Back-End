import * as express from 'express';

const router = express.Router();
import userControllers from '../controllers/user';

router.post('/signup', userControllers.signUp);

export default router;