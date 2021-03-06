import * as limit from 'express-rate-limit';
import { Request, Response } from 'express';

export const limiter: limit.RateLimit = limit({
  windowMs: 1000, //이 시간동안
  max: 15, //최대횟수
  handler(req: Request, res: Response) {
    //어겼을 경우
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: '1초에 최대 15번까지 요청가능 합니다.',
    });
  },
});
