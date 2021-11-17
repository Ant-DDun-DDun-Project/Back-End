import * as express from 'express';
const router = express.Router();

import { Request, Response, NextFunction } from 'express';
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hi');
});

export default router;
