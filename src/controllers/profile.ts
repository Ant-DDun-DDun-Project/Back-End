import { Request, Response, NextFunction } from 'express';
import { ProfileQuery } from '../models/query';
import { QueryTypes } from 'sequelize';
import { sequelize, Either, User } from '../models';
import joi from './joi';
import { UserModel } from '../models/users';
const profileQuery = new ProfileQuery();

class profileController {
  //내가 쓴 글
  public getMyPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id: string = req.params.user_id as string; //req.params로 user의 고유id를 받아온다
      const [either, multi]: object[][] = await Promise.all([
        //Promise.all로 내가 쓴 글을 병렬로 찾아와서 변수로 저장한다.
        Either.findAll({
          attributes: [
            'eitherId',
            'user',
            'title',
            'date',
            'edited',
            'editedDate',
            'completed',
            'likeCnt',
          ],
          where: { user: user_id },
        }),
        sequelize.query(profileQuery.getMyPosts(user_id), {
          type: QueryTypes.SELECT,
        }),
      ]);
      const post: object[] = [...either, ...multi]; //찬반 포스팅과 객관식 포스팅이 한배열안에 담기게 함
      const posts: object[] = post.sort((b, a) => {
        //@ts-ignore
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; //최신순 정렬
      });
      res.status(200).json({ success: true, posts }); //status code는 200, success:true, 정렬된 포스팅을 보내준다.
    } catch (err) {
      next(err);
    }
  };
  //내가 참여한 글
  public getMyPolls = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id: string = req.params.user_id as string; //req.params로 해당 user의 고유 id를 받아온다
      const [either, multi]: object[][] = await Promise.all([
        //Promise.all 내가 참여한 글을 병렬로 찾아와서 변수로 저장한다.
        sequelize.query(profileQuery.getMyPollsForEither(user_id), {
          type: QueryTypes.SELECT,
        }),
        sequelize.query(profileQuery.getMyPollsForMulti(user_id), {
          type: QueryTypes.SELECT,
        }),
      ]);
      const post = [...either, ...multi]; //찬반 포스팅과 객관식 포스팅이 한배열안에 담기게 함
      const posts = post.sort((b, a) => {
        //@ts-ignore
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; //최신순 정렬
      });
      res.status(200).json({ success: true, posts }); //status code는 200, success: true, 정렬된 포스팅을 보내준다.
    } catch (err) {
      next(err);
    }
  };
  //닉네임 변경
  public editNickname = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nickname }: { nickname: string } = await joi.editNickSchema.validateAsync(req.body); //req.body로 바꿀 닉네임을 받는다
      const user: number = res.locals.user; //현재 로그인한 user의 고유id
      const NickExist: UserModel = await User.findOne({ where: { id: user } }); //DB에서 해당 고유 id를 가진 user를 찾는다
      if (NickExist) {
        //user가 있으면
        await User.update({ nickname }, { where: { id: user } }); //닉네임을 변경한다
        res.status(200).json({
          success: true,
          nickname,
        }); //status code는 200, success:true와 닉네임을 보내준다.
      } else {
        //user가 없으면
        res.status(400).json({ success: false }); //status code는 400, success:false를 보내준다
      }
    } catch (err) {
      next(err);
    }
  };
  //프로필페이지 뷰
  public getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id: string = req.params.user_id as string; //req.params로 해당 user의 고유id를 받아온다
      const user = await User.findOne({ where: { id: user_id } }); //고유 id로 user를 찾는다
      if (user) {
        //user가 있으면
        const nickname: string = user.nickname; //해당 user의 닉네임
        res.status(200).json({ success: true, nickname }); //status code는 200, success: true와 닉네임을 보내준다.
      } else {
        //user가 없으면
        res.status(400).json({ success: false }); //status code는 400, success: false를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  };
}

export default new profileController();
