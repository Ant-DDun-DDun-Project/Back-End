import {logger} from '../logger';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

interface Err {
  name?: string
  status?: number;
  message?: string;
  stack?: string;
}

export function errorHandler(err: Err, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  logger.error(`${ err.stack }`);
  console.error(err);
  res.status(err.status || 500).send(err.message);
}

export function routerError(req:Request, res:Response, next:NextFunction) {
  const error: Err = new Error(`${ req.method } ${ req.originalUrl } 라우터 에러입니다.`);
  error.status = 404;
  next(error);
}