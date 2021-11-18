import { Request, Response, NextFunction } from 'express';
import { sequelize, Multi, Like, Vote } from '../models';
import { QueryTypes } from 'sequelize';
import joi from './joi';
import { sortMulti } from './utils/sort-posts';
import { countVote } from './utils/vote-count';
import { MultiQuery } from '../models/query';
import { MultiModel } from '../models/multi';
import { LikeModel } from '../models/likes';
import { VoteModel } from '../models/votes';
const multiQuery = new MultiQuery();

export interface UnsortedMulti {
  multiId?: number;
  title: string;
  description: string;
  contentA: string;
  contentB: string;
  contentC?: string;
  contentD?: string;
  contentE?: string;
  date: string;
  completed?: boolean;
  edited?: boolean;
  editedDate?: string;
  likeCnt?: number;
  user?: number | string;
  voted?: string;
  liked?: number;
  commentCnt?: number;
  nickname: string;
}

class multiControllers {
  //객관식 페이지 메인뷰
  public getMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { multi_id } = req.params; //req.params로 객관식 포스팅의 고유 id를 받아온다, 상세페이지나 특정페이지를 본 경우에는 해당 고유 id가 오고 아닐시 all이라는 문자로 온다.
      const user: number = res.locals.user; //현재 로그인한 user의 고유id
      if (multi_id === 'all') {
        //뒤로가기나 해당 게시물 클릭을 통해서 main view로 온 것이 아닐때
        const multi: object[] = await sequelize.query(multiQuery.getMulti(user), {
          type: QueryTypes.SELECT,
        }); //객관식 포스팅을 가져옴
        res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다
      } else {
        //상세페이지나 특정페이지를 보고난 후 main view로 갔을때
        const unsortedMulti: UnsortedMulti[] = await sequelize.query(multiQuery.getMulti(user), {
          type: QueryTypes.SELECT,
        }); //객관식 포스팅을 가져옴
        const multi = sortMulti(unsortedMulti, multi_id); //해당 고유id를 가진 포스팅이 가장 먼저 오도록 정렬
        res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다.
      }
    } catch (err) {
      next(err);
    }
  };
  //객관식 페이지 진행중 뷰
  public getIngMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { multi_id } = req.params; //req.params로 객관식 포스팅의 고유 id를 받아온다, 상세페이지나 특정페이지를 본 경우에는 해당 고유 id가 오고 아닐시 all이라는 문자로 온다.
      const user: number = res.locals.user; //현재 로그인한 user의 고유id
      if (multi_id === 'all') {
        //뒤로가기나 해당 게시물 클릭을 통해서 main view로 온 것이 아닐때
        const multi: object[] = await sequelize.query(multiQuery.getIngMulti(user), {
          type: QueryTypes.SELECT,
        }); //객관식 포스팅을 가져옴
        res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다
      } else {
        //상세페이지나 특정페이지를 보고난 후 main view로 갔을때
        const unsortedMulti: UnsortedMulti[] = await sequelize.query(multiQuery.getIngMulti(user), {
          type: QueryTypes.SELECT,
        }); //객관식 포스팅을 가져옴
        const multi = sortMulti(unsortedMulti, multi_id); //해당 고유id를 가진 포스팅이 가장 먼저 오도록 정렬
        res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다.
      }
    } catch (err) {
      next(err);
    }
  };
  //객관식 페이지 투표종료 뷰
  public getCompleteMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { multi_id } = req.params; //req.params로 객관식 포스팅의 고유 id를 받아온다, 상세페이지나 특정페이지를 본 경우에는 해당 고유 id가 오고 아닐시 all이라는 문자로 온다.
      const user: number = res.locals.user; //현재 로그인한 user의 고유id
      if (multi_id === 'all') {
        //뒤로가기나 해당 게시물 클릭을 통해서 main view로 온 것이 아닐때
        const multi = await sequelize.query(multiQuery.getCompleteMulti(user), {
          type: QueryTypes.SELECT,
        }); //객관식 포스팅을 가져옴
        res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다
      } else {
        //상세페이지나 특정페이지를 보고난 후 main view로 갔을때
        const unsortedMulti: UnsortedMulti[] = await sequelize.query(
          multiQuery.getCompleteMulti(user),
          {
            type: QueryTypes.SELECT,
          }
        ); //객관식 포스팅을 가져옴
        const multi = sortMulti(unsortedMulti, multi_id); //해당 고유id를 가진 포스팅이 가장 먼저 오도록 정렬
        res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다.
      }
    } catch (err) {
      next(err);
    }
  };
  // 객관식 상세페이지 뷰
  public getTargetMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { multi_id } = req.params; //req.params로 특정 객관식 포스팅
      const user: number = res.locals.user; //현재 로그인한 user의 고유id
      const multi = await sequelize.query(multiQuery.getTargetMulti(user, multi_id), {
        type: QueryTypes.SELECT,
      }); //특정 객관식 포스팅 데이터를 가져옴
      if (multi.length > 0) {
        // 객관식 게시글이 존재하는 경우
        const [comment, childComment] = await Promise.all([
          //Promise.all로 댓글과, 대댓글을 변수로 저장함
          sequelize.query(multiQuery.getComment(user, multi_id), {
            type: QueryTypes.SELECT,
          }),
          sequelize.query(multiQuery.getChildComment(user, multi_id), {
            type: QueryTypes.SELECT,
          }),
        ]);
        res.status(200).json({ success: true, multi: multi[0], comment, childComment }); //status code 200, success:true, 객관식포스팅, 댓글, 대댓글 데이터를 보내준다.
      } else {
        // 객관식 상세 페이지가 존재하지 않는 경우
        res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  };
  // 객관식 게시글 작성
  public postMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        title,
        description,
        contentA,
        contentB,
        contentC,
        contentD,
        contentE,
        date,
      }: {
        title: string;
        description: string;
        contentA: string;
        contentB: string;
        contentC: string;
        contentD: string;
        contentE: string;
        date: string;
      } = await joi.multiSchema.validateAsync(req.body); //req.body로 객관식 데이터(제목,내용, 선택지 A,B,C,D,E, 날짜)를 받아온다.
      const user: number = res.locals.user; //로그인한 유저는 user 아이디를 갖는다.
      await Multi.create({
        user,
        title,
        description,
        contentA,
        contentB,
        contentC,
        contentD,
        contentE,
        date,
      }); // 객관식 게시물 DB 저장
      res.status(200).json({ success: true }); // 게시글 작성 성공시 { success: true } 전송
    } catch (err) {
      next(err);
    }
  };

  //객관식 게시글 수정
  public editMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { multi_id } = req.params; //req.params로 해당 게시물 고유id를 받아옴
      const {
        title,
        description,
        contentA,
        contentB,
        contentC,
        contentD,
        contentE,
        editedDate,
      }: {
        title: string;
        description: string;
        contentA: string;
        contentB: string;
        contentC: string;
        contentD: string;
        contentE: string;
        date: string;
        editedDate: string;
      } = await joi.editMultiSchema.validateAsync(req.body); //req.body로 객관식 데이터(제목,내용, 선택지 A,B,C,D,E, 수정날짜)를 받아온다.
      await Multi.update(
        {
          title,
          description,
          contentA,
          contentB,
          contentC,
          contentD,
          contentE,
          editedDate,
          edited: true,
        },
        {
          where: { multiId: multi_id },
        }
      ); //받아온 데이터로 업데이트를 해준다
      res.status(200).json({ success: true }); // status code 200, success:true를 보내준다
    } catch (err) {
      next(err);
    }
  };
  //객관식 게시글 삭제
  public deleteMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { multi_id } = req.params; //req.params로 해당 게시물 고유id를 받아옴
      const user: number = res.locals.user; //현재 로그인한 user의 고유id
      const userCheck: MultiModel = await Multi.findOne({ where: { multiId: multi_id, user } }); //user가 해당 게시물을 작성했는지 확인
      if (userCheck) {
        //작성자가 맞으면
        await Multi.destroy({ where: { multiId: multi_id, user } }); //해당 게시물 삭제
        res.status(200).json({ success: true }); //status code 200, success:true를 보내준다.
      } else {
        //작성자가 아니면
        res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  };
  //객관식 게시글 좋아요
  public likeMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { multi_id } = req.params;
      const user: number = res.locals.user;
      const alreadyLike: LikeModel = await Like.findOne({ where: { multi: multi_id, user } });
      if (alreadyLike) {
        res.status(400).json({ success: false });
      } else {
        await Like.create({ user, multi: multi_id });
        const likeCnt: number = await Like.count({ where: { multi: multi_id } });
        await Multi.update({ likeCnt }, { where: { multiId: multi_id } });
        res.status(200).json({ success: true, likeCnt });
      }
    } catch (err) {
      next(err);
    }
  };
  //객관식 투표하기
  public voteMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { select } = await joi.voteMultiSchema.validateAsync(req.body); //req.body로 선택한 선택지를 받아옴
      const { multi_id } = req.params; //req.params로 해당 게시글의 고유id를 받아옴
      const user: number = res.locals.user; //현재 로그인한 유저의 고유id
      const alreadyVote: VoteModel = await Vote.findOne({ where: { user, multi: multi_id } }); //이미 투표했는지 확인
      if (alreadyVote) {
        //이미 투표했으면
        res.status(400).json({ success: false }); //status code 400, success:false를 보내줌
      } else {
        //투표하지 않았으면
        await Vote.create({ user, vote: select, multi: multi_id }); //투표기록을 남김
        const totalVote: VoteModel[] = await Vote.findAll({
          where: { multi: multi_id },
          raw: true,
        }); //해당 게시글의 총 투표수를 계산하기 위해 해당게시글에 해당하는 투표기록 가져옴
        const [voteCntA, voteCntB, voteCntC, voteCntD, voteCntE]: number[] = await countVote(
          totalVote
        ); //투표수를 count해서 각각 변수에 저장.
        res.status(200).json({
          success: true,
          voteCntA,
          voteCntB,
          voteCntC,
          voteCntD,
          voteCntE,
        }); //status code 200, success:true, 각각의 투표수를 보내준다
      }
    } catch (err) {
      next(err);
    }
  };
  // 객관식 게시글 종료하기
  public completeMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { multi_id } = req.params; //req.params로 해당 게시글의 고유id를 받아옴
      const user: number = res.locals.user; //현재 로그인한 user
      const userCheck: MultiModel = await Multi.findOne({
        where: { user, multiId: multi_id, completed: false },
      }); //종료되지 않은 해당 게시글의 작성자 확인
      if (userCheck) {
        //작성자가 맞으면
        await Multi.update({ completed: true }, { where: { user, multiId: multi_id } }); //해당 게시글 수정
        res.status(200).json({ success: true }); //status code 200, success:true를 보내준다
      } else {
        //작성자가 아니면
        res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  };
}

export default new multiControllers();
