import { Request, Response, NextFunction } from 'express';
import * as scheduler from 'node-schedule';
import * as requestIp from 'request-ip';
import { Visitor } from '../models';
import * as moment from 'moment';
import { client } from './redis';

export const mainVisitor = async (req: Request, res: Response, next: NextFunction) => {
  const clientIp: string = requestIp.getClientIp(req);  // client의 IP 주소 가져오기
  const now = moment();
  const end = moment(moment().format('YYYY-MM-DD 23:59:59'));
  const duration = moment.duration(end.diff(now));

  await client.pfadd('main', clientIp + ' 2'); // hyperloglog add
  await client.expire('main', Math.floor(duration.asSeconds()));
  next();
};

// Schedule DAU 저장
export const dauSchedule = scheduler.scheduleJob('58 59 23 * * *', async () => {
  console.log(`start counting visitor...`);

  const visitorCnt = await client.pfcount('main');  // 오늘 하루 방문자 count
  const date = moment().format('YYYY-MM-DD'); // 오늘 날짜
  console.log(`오늘 방문자: ${visitorCnt}`);
  await Visitor.create({  // 오늘 하루 방문자 Mysql DB 저장
    date,
    visitorCnt,
    location: 'main'
  });
  console.log(`오늘 방문자 저장 완료`);
});