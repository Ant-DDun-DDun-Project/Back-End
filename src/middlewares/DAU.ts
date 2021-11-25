import { Request, Response, NextFunction } from 'express';
import * as scheduler from 'node-schedule';
import * as requestIp from 'request-ip';
import { Visitor } from '../models';
import * as moment from 'moment';
import { client } from './redis';

// 메인 페이지 방문자 카운팅
export const mainVisitor = async (req: Request, res: Response, next: NextFunction) => {
  const clientIp: string = requestIp.getClientIp(req);  // client의 IP 주소 가져오기
  console.log(`접속 IP: clientIp`);
  const now = moment();
  const end = moment(moment().format('YYYY-MM-DD 23:59:59'));
  const duration = moment.duration(end.diff(now));

  await client.pfadd('main', clientIp); // hyperloglog add
  await client.expire('main', Math.floor(duration.asSeconds()));
  next();
};

// Schedule DAU 저장
export const dauSchedule = scheduler.scheduleJob('58 59 23 * * *', async (): Promise<void> => {
  console.log(`start counting visitor...`);

  const visitorCnt: number = await client.pfcount('main');  // 오늘 하루 방문자 count
  const date: string = moment().format('YYYY-MM-DD'); // 오늘 날짜
  console.log(`오늘 방문자: ${visitorCnt}`);
  await Visitor.create({  // 오늘 하루 방문자 Mysql DB 저장
    date,
    visitorCnt,
    location: 'main'
  });
  console.log(`오늘 방문자 저장 완료`);
});