const { Comment, CommentLike, User } = require('../models');
const { postCommentSchema, editCommentSchema } = require('./joi');
const moment = require('moment');

module.exports = {
  //댓글 작성
  postComment: async (req, res, next) => {
    try {
      const { comment } = await postCommentSchema.validateAsync(req.body); //req.body로 댓글 정보(내용)를 받는다.
      const { multi_id } = req.params; //req.params로 해당 댓글이 달린 게시글의 고유id를 받는다.
      const date = moment().format('YYYY-MM-DD HH:mm:ss'); //작성날짜
      const user = res.locals.user; //현재 로그인한 user의 고유id
      const [targetComment, nickname] = await Promise.all([
        //Promise.all로 댓글 생성과 작성한 user의 닉네임을 찾아서 각각 변수로 지정한다.
        Comment.create({
          user,
          multi: multi_id,
          comment,
          date,
        }),
        User.findOne({
          attributes: ['nickname'],
          where: { id: user },
          raw: true,
        }),
      ]);
      const newComment = Object.assign(nickname, targetComment.dataValues); //두 객체를 하나로 합친다(닉네임과 댓글생성이 각각 객체로 나옴)
      res.status(200).json({
        success: true,
        newComment,
      }); //status code 200, success:true, 작성한 댓글 정보를 보내준다.
    } catch (err) {
      next(err);
    }
  },
  // 댓글 수정
  editComment: async (req, res, next) => {
    try {
      const { comment } = await editCommentSchema.validateAsync(req.body); //req.body로 수정할 댓글 정보(내용)를 받는다.
      const { multi_id, comment_id } = req.params; //req.params로 해당 댓글이 달린 게시물의 고유id와 댓글의 고유id을 받는다.
      const editedDate = moment().format('YYYY-MM-DD HH:mm:ss'); //수정날짜
      const user = res.locals.user; //현재 로그인한 user의 고유id
      if (await Comment.findOne({ where: { user, multi: multi_id, id: comment_id } })) {
        //해당 댓글의 작성자가 로그인 한 user가 맞으면
        await Comment.update(
          {
            comment,
            editedDate,
            edited: true,
          },
          { where: { user, multi: Number(multi_id), id: Number(comment_id) } }
        ); //해당 댓글 수정
        const [targetComment, nickname] = await Promise.all([
          //Promise.all로 update된 해당 댓글과 user의 닉네임을 병렬적으로 가져와서 각각 변수로 지정
          Comment.findOne({
            where: { user, multi: multi_id, id: comment_id },
          }),
          User.findOne({
            attributes: ['nickname'],
            where: { id: user },
            raw: true,
          }),
        ]);
        const newComment = Object.assign(nickname, targetComment.dataValues); //두 객체(닉네임,해당 댓글 정보)를 하나로 합침
        res.status(200).json({
          success: true,
          newComment,
        }); //status code 200m success:true, 수정된 댓글 정보를 보내준다.
      } else {
        //작성자가 아니면
        res.status(400).json({
          success: false,
        }); //status code 400, success:false를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  },
  // 댓글 삭제
  deleteComment: async (req, res, next) => {
    try {
      const { multi_id, comment_id } = req.params; //req.params로 해당 댓글이 있는 게시물의 고유id와 해당 댓글의 고유id를 가져온다
      const user = res.locals.user; //로그인한 user의 고유id
      if (await Comment.findOne({ where: { user, multi: multi_id, id: comment_id } })) {
        //로그인한 유저가 해당 댓글의 작성자가 맞으면
        await Comment.update(
          {
            deleted: true,
          },
          { where: { user, multi: multi_id, id: comment_id } }
        ); //해당 댓글의 삭제상태를 true로 변경
        const [targetComment, nickname] = await Promise.all([
          //Promise.all로 삭제된 해당 댓글과 user의 닉네임을 병렬적으로 가져와서 각각 변수로 지정
          Comment.findOne({
            where: { user, multi: multi_id, id: comment_id },
          }),
          User.findOne({
            attributes: ['nickname'],
            where: { id: user },
            raw: true,
          }),
        ]);
        const newComment = Object.assign(nickname, targetComment.dataValues); //두 객체(닉네임,해당 댓글 정보)를 하나로 합침
        res.status(200).json({
          success: true,
          newComment,
        }); //status code 200, success:true, 수정된 댓글 정보를 보내준다.
      } else {
        //작성자가 아니면
        res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  },
  // 댓글 좋아요
  likeComment: async (req, res, next) => {
    try {
      const { multi_id, comment_id } = req.params; //req.params로 해당 댓글이 있는 게시물의 고유id와 댓글의 고유id를 받아온다.
      const user = res.locals.user; //현재 로그인한 user의 고유id
      const likeExist = await CommentLike.findOne({
        where: { multi: multi_id, comment: comment_id, user },
      }); //좋아요 기록 확인
      if (likeExist) {
        //좋아요를 이미 했으면
        return res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
      } else {
        //좋아요를 한 기록이 없으면
        await CommentLike.create({ user, comment: Number(comment_id), multi: Number(multi_id) }); //좋아요 기록 생성
        const likeCnt = await CommentLike.count({
          where: { comment: comment_id, multi: multi_id },
        }); //해당 댓글의 좋아요 갯수 확인
        await Comment.update(
          { likeCnt },
          { where: { id: Number(comment_id), multi: Number(multi_id) } }
        ); //댓글 좋아요 수 update
        res.status(200).json({ success: true, likeCnt }); //status code 200, success:true, 좋아요 수를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  },
};
