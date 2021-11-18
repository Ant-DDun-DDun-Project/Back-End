import * as express from 'express';
import searchControllers from '../controllers/search';
const router = express.Router();

router.get('/', searchControllers.searchPosts)

export default router;