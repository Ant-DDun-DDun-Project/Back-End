import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

// 게스트 허용 인증 미들웨어
export function authForGuest(req: Request, res: Response, next: NextFunction) {
  try {
    const token: string = req.cookies.user;
    if (!token) {
      res.locals.user = 13;
      next();
    } else {
      const { id } = jwt.verify(token, process.env.SECRET_KEY) as jwt.JwtPayload;
      res.locals.user = id;
      next();
    }
  } catch (err) {
    next(err);
  }
}

// 사용자 인증 미들웨어
export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token: string = req.cookies.user;
    if (!token) {
      res.status(401).json({ success: false });
    } else {
      const { id } = jwt.verify(token, process.env.SECRET_KEY) as jwt.JwtPayload;
      res.locals.user = id;
      next();
    }
  } catch (err) {
    next(err);
  }
}