import * as express from 'express';
import mainControllers from '../controllers/main';
import { mainVisitor } from '../middlewares/DAU';

const router = express.Router();

router.get('/', mainVisitor, mainControllers.getMain);

export default router;