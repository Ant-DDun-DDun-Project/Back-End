import { Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../models';
import { MainQuery } from '../models/query';
import { countPosting } from './utils/posting-count';
import { countAttend } from './utils/attend-count';

const mainQuery = new MainQuery();

class mainControllers {
  public getMain = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [either, multi, [eitherNum, multiNum], attendNum] = await Promise.all([
        //Promise.all로 각각의 데이터들(찬반투표 포스팅, 객관식 포스팅, 찬반투표 포스팅갯수, 객관식 포스팅갯수, 참여자수)를 병렬적으로 받아온다.
        sequelize.query(mainQuery.getMainForEither(), { type: QueryTypes.SELECT }),
        sequelize.query(mainQuery.getMainForMulti(), { type: QueryTypes.SELECT }),
        countPosting(),
        countAttend(),
      ]);
      const postingNum = eitherNum + multiNum; //포스팅 전체 갯수 = 찬반투표 포스팅갯수 + 객관식 포스팅 갯수
      res.status(200).json({
        success: true,
        either,
        multi,
        postingNum,
        multiNum,
        eitherNum,
        attendNum,
      }); //status code 200, success:true, 각각의 데이터들(찬반투표 포스팅, 객관식 포스팅, 전체 포스팅 갯수, 찬반투표 포스팅갯수, 객관식 포스팅갯수, 참여자수)
    } catch (err) {
      next(err);
    }
  };
}

export default new mainControllers();