import { Request, Response, NextFunction } from 'express';
import { ChildComment, User, CommentLike } from '../models';
import joi from './joi';
import * as moment from 'moment';
import { ChildCommentModel } from '../models/child-comments';
import { UserModel } from '../models/users';
import { CommentLikeModel } from '../models/comment-likes';

class childCommentControllers {
  //대댓글 작성
  public async postChildComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { comment }: { comment: string } = await joi.postCommentSchema.validateAsync(req.body); //req.body로 대댓글 정보(내용, 작성날짜)를 받아온다.
      const { multi_id, comment_id } = req.params; //req.params로 해당 대댓글이 달린 게시물과 댓글의 고유id를 받아온다
      const date: string = moment().format('YYYY-MM-DD HH:mm:ss'); //작성날짜
      const user = res.locals.user; //현재 로그인한 user의 고유id
      const [child, nickname]: [ChildCommentModel, UserModel] = await Promise.all([
        //Promise.all로 대댓글 생성, 작성자의 닉네임을 병렬적으로 수행한 후 각각 변수 지정
        ChildComment.create({
          user,
          multi: multi_id,
          parentComment: comment_id,
          comment,
          date,
        }),
        User.findOne({
          attributes: ['nickname'],
          where: { id: user },
          raw: true,
        }),
      ]);
      const childMent: ChildCommentModel = await ChildComment.findOne({
        where: {
          user,
          multi: multi_id,
          parentComment: comment_id,
          comment,
          date,
        },
        raw: true,
      });
      const childComment = Object.assign(nickname, childMent); //두 객체(닉네임, 대댓글)를 한객체로 병합
      res.status(200).json({
        success: true,
        childComment,
      }); //status code 200, success:true, 대댓글정보를 보내준다.
    } catch (err) {
      next(err);
    }
  }

  //대댓글 수정
  public async editChildComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { comment }: { comment: string } = await joi.editCommentSchema.validateAsync(req.body); //req.body로 대댓글 수정정보(수정내용, 수정날짜)를 받아온다.
      const { multi_id, comment_id } = req.params; //req.params로 해당 대댓글이 달린 게시물과 대댓글의 고유id를 받아온다.
      const editedDate: string = moment().format('YYYY-MM-DD HH:mm:ss'); //수정날짜
      const user: number = res.locals.user; //현재 로그인한 user의 고유id
      const userCheck: ChildCommentModel | null = await ChildComment.findOne({
        where: { multi: multi_id, id: comment_id, user },
      }); //현재 로그인한 사람이 해당 대댓글의 작성자인지 확인
      if (userCheck) {
        //작성자가 맞으면
        await ChildComment.update(
          { comment, editedDate },
          { where: { multi: Number(multi_id), id: Number(comment_id), user } }
        ); //해당 대댓글 수정
        const [childMent, nickname]: [ChildCommentModel, UserModel] = await Promise.all([
          //Promise.all로 수정한 댓글 정보와 로그인한 사람의 닉네임을 병렬적으로 찾아서 변수로 저장
          ChildComment.findOne({
            where: {
              multi: multi_id,
              id: comment_id,
              user,
            },
            raw: true,
          }),
          User.findOne({
            attributes: ['nickname'],
            where: { id: user },
            raw: true,
          }),
        ]);
        const childComment = Object.assign(nickname, childMent); //두 객체(닉네임, 대댓글 정보)를 한 객체로 합침
        res.status(200).json({
          success: true,
          childComment,
        }); //status code 200, success:true, 대댓글 정보를 보내준다.
      } else {
        //작성자가 아니면
        res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  }

  // 대댓글 삭제
  public async deleteChildComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { multi_id, comment_id } = req.params; //req.params로 해당 대댓글이 달린 게시물과 해당 대댓글의 고유id를 받아온다.
      const user: number = res.locals.user; //현재 로그인한 user의 고유id
      if (await ChildComment.findOne({ where: { user, multi: multi_id, id: comment_id } })) {
        //현재 로그인한 user가 해당 대댓글의 작성자이면
        await ChildComment.update(
          { deleted: true },
          { where: { user, multi: Number(multi_id), id: Number(comment_id) } }
        ); //해당 대댓글의 삭제상태를 true로 변경
        const [childMent, nickname]: [ChildCommentModel, UserModel] = await Promise.all([
          //Promise.all로 수정한 댓글 정보와 로그인한 사람의 닉네임을 병렬적으로 찾아서 변수로 저장
          ChildComment.findOne({
            where: {
              multi: multi_id,
              id: comment_id,
              user,
            },
            raw: true,
          }),
          User.findOne({
            attributes: ['nickname'],
            where: { id: user },
            raw: true,
          }),
        ]);
        const childComment = Object.assign(nickname, childMent); //두 객체(닉네임, 대댓글 정보)를 한 객체로 병합
        res.status(200).json({
          success: true,
          childComment,
        }); //status code 200, success:true, 대댓글 정보를 보내준다.
      } else {
        //작성자가 아니면
        res.status(400).json({ success: false }); //success:false를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  }

  //대댓글 좋아요
  public async likeChildComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { multi_id, comment_id } = req.params; //req.params로 해당 대댓글이 달린 게시물과 해당 대댓글의 고유id를 받아온다.
      const user: number = res.locals.user; //현재 로그인한 user의 고유id
      const likeExist: CommentLikeModel | null = await CommentLike.findOne({
        where: { multi: multi_id, childComment: comment_id, user },
      }); //해당 대댓글에 로그인한 user가 좋아요한 기록이 있는지 확인
      if (likeExist) {
        //좋아요 기록이 존재하면
        return res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
      } else {
        //좋아요 기록이 없으면
        await CommentLike.create({
          user,
          childComment: Number(comment_id),
          multi: Number(multi_id),
        }); //좋아요 기록생성
        const likeCnt: number = await CommentLike.count({
          where: { childComment: comment_id, multi: multi_id },
        }); //좋아요 수 count
        await ChildComment.update(
          { likeCnt },
          { where: { id: Number(comment_id), multi: Number(multi_id) } }
        ); //해당 대댓글의 좋아요 수 정보 update
        res.status(200).json({ success: true, likeCnt }); //status code 200, success:true, 해당 대댓글의 좋아요 수를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  }
}

export default new childCommentControllers();
