import * as express from 'express';
import mainControllers from '../controllers/main';
const router = express.Router();

router.get('/', mainControllers.getMain)

export default router;